'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Users, Clock, ArrowLeft, Navigation } from 'lucide-react';
import MiniTabNav from '@/components/mini-tab-nav';
import toast from 'react-hot-toast';

interface Station {
  id: string;
  name: string;
  code: string;
  mapsCode: string;
  address?: string;
  status: string;
  fuels?: string[];
  peopleWaiting?: number;
  duration?: string;
  phone?: string;
  priceEssence?: number;
  priceDiesel?: number;
}

export default function StationDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [station, setStation] = useState<Station | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/stations/${params.id}`);
        if (!res.ok) throw new Error('load');
        const data = await res.json();
        setStation(data);
      } catch {
        toast.error('Impossible de charger la station');
      } finally {
        setLoading(false);
      }
    };
    if (params?.id) load();
  }, [params?.id]);

  const reserveTicket = async () => {
    if (!station) return;
    setPosting(true);
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stationId: station.id }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || 'Erreur lors de la réservation');
      }
      const ticket = await res.json();
      toast.success('Ticket réservé, passez au paiement');
      router.push(`/tickets/pay/${ticket.ticketId}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Réservation impossible';
      toast.error(msg);
    } finally {
      setPosting(false);
    }
  };

  const startRoute = () => {
    if (!station) return;
    const url = station.mapsCode
      ? `https://www.google.com/maps/search/?api=1&query=place_id:${encodeURIComponent(station.mapsCode)}`
      : station.address
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`
      : undefined;
    if (url) window.open(url, '_blank');
    else toast.error("Aucune donnée de localisation disponible");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">Chargement...</div>
    );
  }

  if (!station) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">Station introuvable</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => router.back()} className="mb-4 inline-flex items-center gap-2 text-white/90 hover:text-white">
            <ArrowLeft size={18} />
            Retour
          </button>
          <h1 className="text-2xl font-bold">Détails de la Station</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-gray-900">{station.name}</h2>
              {station.address && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} /> {station.address}
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className={`rounded-lg px-4 py-3 text-sm border ${station.status==='open' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                <span className="inline-flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${station.status==='open' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {station.status==='open' ? 'Carburant Disponible' : 'Carburant Indisponible'}
                </span>
              </div>
            </div>

            {station.mapsCode && (
              <div className="mt-4 text-sm text-gray-600">
                <div className="text-xs text-gray-500 mb-1">Code Google Maps</div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=place_id:${encodeURIComponent(station.mapsCode)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {station.mapsCode}
                </a>
              </div>
            )}

            {station.fuels?.length ? (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2">Types de Carburant</div>
                <div className="flex flex-wrap gap-2">
                  {station.fuels.map((f) => (
                    <Badge key={f} className="bg-gray-100 text-gray-700 border-gray-200">{f}</Badge>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500">File d&apos;attente</div>
                <div className="mt-1 flex items-center gap-2 font-medium text-gray-900"><Users size={16} /> {station.peopleWaiting ?? '—'} pers.</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-xs text-gray-500">Attente moy.</div>
                <div className="mt-1 flex items-center gap-2 font-medium text-gray-900"><Clock size={16} /> {station.duration ?? '—'}</div>
              </div>
            </div>

            {station.phone && (
              <div className="mt-3 flex items-center gap-2 text-gray-700">
                <Phone size={16} /> {station.phone}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button onClick={reserveTicket} disabled={posting} className="w-full">Réserver un ticket</Button>
              <Button onClick={startRoute} variant="secondary" className="w-full flex items-center justify-center gap-2">
                <Navigation size={16} /> Démarrer le trajet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
