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
  const [remaining, setRemaining] = useState(20 * 60); // 20 minutes in seconds
  const ticketId = params?.ticketId as string;

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
        body: JSON.stringify({ ticketId }),
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
      <h1 className="text-xl font-bold mt-4">Paiement du ticket</h1>

      <div className="mt-4 p-4 rounded-lg border bg-white">
        <p className="text-sm text-gray-700">
          Veuillez effectuer le paiement via <b>Orange Money</b> uniquement.
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Montant: <b>Selon station/ticket</b> (renseignez la note si besoin).
        </p>
        <p className="text-sm text-gray-700 mt-2">
          Numéro de paiement: <b>85239219</b>
        </p>
        <p className="text-xs text-red-600 mt-2">
          Seuls les paiements <b>Orange Money</b> sont acceptés. Aucun remboursement possible.
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Temps restant: <span className="font-mono font-semibold">{timeStr}</span>
          </div>
          <Button onClick={confirmPayment} disabled={remaining === 0}>
            Confirmer le paiement
          </Button>
        </div>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
