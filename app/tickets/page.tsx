'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

interface Ticket {
  id: string;
  ticketId: string;
  status: string;
  expiresAt: string;
  createdAt: string;
  station: {
    name: string;
    code: string;
    address?: string;
  };
}

export default function TicketsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchTickets();
    }
  }, [session]);

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Erreur lors du chargement des tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTicket = async (ticketId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler ce ticket?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Ticket annulé avec succès');
        fetchTickets();
      } else {
        toast.error('Erreur lors de l\'annulation du ticket');
      }
    } catch (error) {
      console.error('Error cancelling ticket:', error);
      toast.error('Erreur lors de l\'annulation du ticket');
    }
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (ticket: Ticket) => {
    if (ticket.status === 'cancelled') {
      return <Badge variant="error">Annulé</Badge>;
    }
    if (isExpired(ticket.expiresAt)) {
      return <Badge variant="warning">Expiré</Badge>;
    }
    return <Badge variant="success">Actif</Badge>;
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#6B7280]">Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const activeTickets = tickets.filter(
    (t) => t.status === 'active' && !isExpired(t.expiresAt)
  );
  const inactiveTickets = tickets.filter(
    (t) => t.status !== 'active' || isExpired(t.expiresAt)
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Mes Tickets</h1>

        {tickets.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-[#6B7280] mb-4">Vous n'avez aucun ticket</p>
              <Button onClick={() => router.push('/')} variant="primary">
                Réserver un ticket
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {activeTickets.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                  Tickets Actifs
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activeTickets.map((ticket) => (
                    <Card key={ticket.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {ticket.station.name}
                          </CardTitle>
                          {getStatusBadge(ticket)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="bg-[#FF7A00] text-white text-center py-3 px-4 rounded-lg font-mono text-2xl font-bold">
                            {ticket.ticketId}
                          </div>
                          <p className="text-sm text-[#6B7280]">
                            Code: {ticket.station.code}
                          </p>
                          {ticket.station.address && (
                            <p className="text-sm text-[#6B7280]">
                              {ticket.station.address}
                            </p>
                          )}
                          <p className="text-sm text-[#6B7280]">
                            Expire le: {formatDate(ticket.expiresAt)}
                          </p>
                          <p className="text-sm text-[#6B7280]">
                            Créé le: {formatDate(ticket.createdAt)}
                          </p>
                          <Button
                            onClick={() => handleCancelTicket(ticket.id)}
                            variant="danger"
                            size="sm"
                            className="w-full mt-4"
                          >
                            Annuler le ticket
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {inactiveTickets.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                  Historique
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {inactiveTickets.map((ticket) => (
                    <Card key={ticket.id} className="opacity-75">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {ticket.station.name}
                          </CardTitle>
                          {getStatusBadge(ticket)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="bg-gray-400 text-white text-center py-3 px-4 rounded-lg font-mono text-2xl font-bold">
                            {ticket.ticketId}
                          </div>
                          <p className="text-sm text-[#6B7280]">
                            Code: {ticket.station.code}
                          </p>
                          <p className="text-sm text-[#6B7280]">
                            Expiré le: {formatDate(ticket.expiresAt)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
