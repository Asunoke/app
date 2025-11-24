'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import type { User as PrismaUser } from '@prisma/client';

type Html5QrcodeScannerCtor = new (
  elementId: string,
  config: { fps: number; qrbox: number }
) => {
  render: (
    onSuccess: (decodedText: string) => void,
    onError: () => void
  ) => void;
};

export default function ScanTicketPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastResult, setLastResult] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;
    // Only ADMIN or MANAGER can access
    const role = (session.user as PrismaUser | undefined)?.role;
    if (role !== 'ADMIN' && role !== 'MANAGER') {
      router.push('/');
      return;
    }

    let cancelled = false;

    const ensureLib = async () => {
      // Load html5-qrcode from CDN once
      if (typeof window !== 'undefined' && !(window as unknown as { Html5QrcodeScanner?: unknown }).Html5QrcodeScanner) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/html5-qrcode@2.3.10/minified/html5-qrcode.min.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load scanner lib'));
          document.body.appendChild(script);
        });
      }
    };

    const start = async () => {
      try {
        await ensureLib();
        if (cancelled) return;
        const Html5QrcodeScanner = (window as unknown as { Html5QrcodeScanner?: unknown }).Html5QrcodeScanner as Html5QrcodeScannerCtor | undefined;
        if (!Html5QrcodeScanner) throw new Error('Scanner indisponible');

        const scanner = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: 250 });
        scanner.render(
          async (decodedText: string) => {
            if (decodedText && decodedText !== lastResult) {
              setLastResult(decodedText);
              try {
                const ticketId = decodedText.trim();
                const res = await fetch('/api/tickets/validate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ ticketId, action: 'validate' }),
                });
                const j = await res.json().catch(() => ({}));
                if (res.ok) {
                  toast.success('Ticket validé');
                } else {
                  toast.error(j?.message || 'Validation échouée');
                }
              } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : 'Erreur réseau';
                toast.error(msg);
              } finally {
              }
            }
          },
          () => {}
        );
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Impossible de démarrer le scanner';
        toast.error(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    start();

    return () => {
      cancelled = true;
    };
  }, [session, router, lastResult]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">Chargement…</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h1 className="text-lg font-semibold mb-2">Scanner un ticket</h1>
        <div id="qr-reader" ref={scannerRef} className="w-full" />
        {lastResult && (
          <div className="mt-4 text-sm text-gray-600">
            Dernier code: <span className="font-mono">{lastResult}</span>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>Retour</Button>
        </div>
      </div>
    </div>
  );
}
