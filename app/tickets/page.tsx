'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import { Ticket as TicketIcon, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import MiniTabNav from '@/components/mini-tab-nav';

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
  const [tab, setTab] = useState<'active' | 'completed' | 'cancelled'>('active');

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
    if (ticket.status === 'used') {
      return <Badge variant="success">Utilisé</Badge>;
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
  // const inactiveTickets = tickets.filter((t) => t.status !== 'active' || isExpired(t.expiresAt));

  const completedTickets = tickets.filter((t) => t.status === 'completed' || t.status === 'used');
  const cancelledTickets = tickets.filter((t) => t.status === 'cancelled');

  const tabTickets =
    tab === 'active' ? activeTickets : tab === 'completed' ? completedTickets : cancelledTickets;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header gradient */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center"><TicketIcon size={18} /></div>
            <div>
              <h1 className="text-2xl font-bold">Mes Tickets</h1>
              <div className="text-sm text-white/90">Gérez vos réservations</div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{activeTickets.length}</div>
              <div className="text-sm opacity-90">Actifs</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{completedTickets.length}</div>
              <div className="text-sm opacity-90">Complétés</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold">{tickets.length}</div>
              <div className="text-sm opacity-90">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex items-center gap-2">
          <button onClick={() => setTab('active')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm ${tab==='active' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Clock size={16} /> Actifs
          </button>
          <button onClick={() => setTab('completed')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm ${tab==='completed' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>
            <CheckCircle2 size={16} /> Complétés
          </button>
          <button onClick={() => setTab('cancelled')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm ${tab==='cancelled' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>
            <XCircle size={16} /> Annulés
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {tabTickets.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-gray-500">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <TicketIcon size={22} />
                </div>
                Aucune réservation
                <div className="text-xs text-gray-400 mt-1">Vous n&apos;avez pas de tickets {tab==='active'?'actifs':tab==='completed'?'complétés':'annulés'}</div>
                {tab === 'active' && (
                  <div className="mt-6">
                    <Button onClick={() => router.push('/')} variant="primary">Réserver un ticket</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tabTickets.map((ticket) => (
                <Card key={ticket.id} className={tab!=='active' ? 'opacity-90' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{ticket.station.name}</CardTitle>
                      {getStatusBadge(ticket)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* QR Code */}
                      <div className="rounded-lg border border-gray-200 p-4 flex items-center justify-center bg-gray-50">
                        <Image
                          alt={`QR ${ticket.ticketId}`}
                          width={112}
                          height={112}
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=112x112&data=${encodeURIComponent(ticket.ticketId)}`}
                        />
                      </div>

                      {/* Big ticket ID ribbon */}
                      <div className={`text-white text-center py-3 px-4 rounded-lg font-mono text-2xl font-bold ${tab==='active' ? 'bg-[#2563eb]' : 'bg-gray-400'}`}>
                        #{ticket.ticketId}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-[#6B7280]">
                        <p>Code: {ticket.station.code}</p>
                        <p className="text-right">Créé: {formatDate(ticket.createdAt)}</p>
                        {tab==='active' && <p>Expire: {formatDate(ticket.expiresAt)}</p>}
                      </div>

                      {tab==='active' && (
                        <div className="grid grid-cols-2 gap-2">
                          <Button onClick={() => (window.location.href = `/tickets/pay/${ticket.ticketId}`)} variant="primary" size="sm" className="w-full">Payer</Button>
                          <Button onClick={() => handleCancelTicket(ticket.id)} variant="danger" size="sm" className="w-full">Annuler</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <MiniTabNav />

      <div className="h-16" />
    </div>
  );
}
