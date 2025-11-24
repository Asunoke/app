"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MiniTabNav from "@/components/mini-tab-nav";
import toast from "react-hot-toast";
import type { User as PrismaUser } from "@prisma/client";

interface Payment {
  id: string;
  createdAt: string;
  status: string;
  method: string;
  amount?: number | null;
  ticket: { ticketId: string };
  station: { id: string; name: string; code: string };
  user: { id: string; email: string; name?: string | null };
}

export default function PaymentsDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending) {
      const role = (session?.user as PrismaUser | undefined)?.role;
      if (!session) {
        router.push("/login");
      } else if (role !== "ADMIN") {
        toast.error("Accès réservé à l’administrateur");
        router.push("/");
      }
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) fetchPayments();
  }, [session]);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments");
      if (!res.ok) throw new Error("Erreur chargement paiements");
      const data = (await res.json()) as Payment[];
      setPayments(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Impossible de charger les paiements";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const topStations = useMemo(() => {
    const counts: Record<string, { count: number; station: Payment["station"] }> = {};
    for (const p of payments) {
      const key = p.station.id;
      if (!counts[key]) counts[key] = { count: 0, station: p.station };
      counts[key].count += 1;
    }
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 10);
  }, [payments]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold mb-4">Paiements des Tickets</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Total paiements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{payments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orange Money</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{payments.filter(p => p.method === 'ORANGE_MONEY').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Montant total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{payments.reduce((s, p) => s + (p.amount ?? 0), 0)} CFA</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Derniers paiements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Ticket</th>
                      <th className="py-2 pr-4">Station</th>
                      <th className="py-2 pr-4">Client</th>
                      <th className="py-2 pr-4">Montant</th>
                      <th className="py-2 pr-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-2 pr-4">{new Date(p.createdAt).toLocaleString('fr-FR')}</td>
                        <td className="py-2 pr-4 font-mono">#{p.ticket.ticketId}</td>
                        <td className="py-2 pr-4">{p.station.name} ({p.station.code})</td>
                        <td className="py-2 pr-4">{p.user.name || p.user.email}</td>
                        <td className="py-2 pr-4">{p.amount ?? '-'}{p.amount ? ' CFA' : ''}</td>
                        <td className="py-2 pr-4">{p.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top stations (par ventes)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topStations.length === 0 && (
                  <li className="text-gray-500 text-sm">Aucune donnée</li>
                )}
                {topStations.map(({ count, station }) => (
                  <li key={station.id} className="flex items-center justify-between">
                    <span>{station.name} ({station.code})</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
