'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MiniTabNav from '@/components/mini-tab-nav';
import toast from 'react-hot-toast';
import type { User as PrismaUser } from '@prisma/client';

interface Ticket {
  id: string;
  ticketId: string;
  status: string;
  createdAt: string;
}

export default function ManagerTicketsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending) {
      const role = (session?.user as PrismaUser | undefined)?.role;
      if (!session) {
        router.push('/login');
      } else if (role !== 'MANAGER') {
        toast.error('Accès réservé aux gérants');
        router.push('/');
      }
    }
  }, [session, isPending, router]);

  const handleValidateTicket = async (action: 'validate' | 'reject') => {
    if (!ticketId.trim()) {
      toast.error('Veuillez entrer un ID de ticket');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/tickets/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: ticketId.trim(), action }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(action === 'validate' ? 'Ticket validé' : 'Ticket rejeté');
        setTicketId('');
      } else {
        toast.error((data as { message?: string })?.message || 'Erreur lors de la validation');
      }
    } catch (e) {
      console.error('Error validating ticket:', e);
      toast.error('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-xl mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold mb-4">Tickets - Gestionnaire</h1>

        <Card>
          <CardHeader>
            <CardTitle>Valider un ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                placeholder="ID du ticket"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value.toUpperCase())}
              />
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-[#FF7A00] hover:bg-[#E66D00] text-white"
                  onClick={() => handleValidateTicket('validate')}
                  disabled={loading}
                >
                  Valider
                </Button>
                <Button
                  className="flex-1 border border-red-200 text-red-600 hover:bg-red-50"
                  variant="outline"
                  onClick={() => handleValidateTicket('reject')}
                  disabled={loading}
                >
                  Rejeter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
