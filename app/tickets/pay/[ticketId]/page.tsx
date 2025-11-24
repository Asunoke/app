"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import MiniTabNav from "@/components/mini-tab-nav";

export default function TicketPaymentPage() {
  const params = useParams<{ ticketId: string }>();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [remaining, setRemaining] = useState(20 * 60); // 20 minutes en secondes
  const ticketId = params?.ticketId as string;
  const AMOUNT = 550; // FCFA par ticket

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = useMemo(() => {
    const m = Math.floor(remaining / 60)
      .toString()
      .padStart(2, "0");
    const s = (remaining % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [remaining]);

  const confirmPayment = async () => {
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId, amount: AMOUNT }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Échec de la confirmation du paiement");
      }
      toast.success("Paiement confirmé. Ticket validé.");
      router.push("/tickets");
    } catch (e: any) {
      toast.error(e?.message || "Impossible de confirmer le paiement");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-24">
      <div className="text-center mt-6">
        <h1 className="text-2xl font-bold">Paiement du Ticket</h1>
        <p className="text-sm text-gray-500">Ticket #{ticketId}</p>
      </div>

      <div className="mt-5 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs opacity-90">Montant</div>
              <div className="text-2xl font-extrabold">{AMOUNT} FCFA</div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-90">Temps restant</div>
              <div className="font-mono text-xl font-bold">{timeStr}</div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-gray-50 border rounded-lg p-3">
            <div className="text-sm text-gray-700">Moyen de paiement</div>
            <div className="font-semibold">Orange Money (OM)</div>
          </div>

          <div className="bg-gray-50 border rounded-lg p-3">
            <div className="text-sm text-gray-700">Numéro de paiement</div>
            <div className="flex items-center justify-between mt-1">
              <div className="font-mono font-semibold text-lg">85239219</div>
              <button
                className="text-xs px-2 py-1 rounded-md border hover:bg-gray-100"
                onClick={() => navigator.clipboard.writeText('85239219').then(() => toast.success('Numéro copié'))}
              >
                Copier
              </button>
            </div>
          </div>

          <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
            <li>Seuls les paiements <b>Orange Money</b> sont acceptés.</li>
            <li>Aucun remboursement possible après confirmation.</li>
            <li>La réservation expire automatiquement après 20 minutes.</li>
          </ul>

          <Button onClick={confirmPayment} disabled={remaining === 0} className="w-full">
            Confirmer le paiement ({AMOUNT} FCFA)
          </Button>
        </div>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
