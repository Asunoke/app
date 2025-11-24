'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import {
  Fuel,
  RefreshCw,
  Store,
  MapPin,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import MiniTabNav from '@/components/mini-tab-nav';

interface Station {
  id: string;
  name: string;
  code: string;
  mapsCode: string;
  status: string;
  address?: string;
  fuels?: string[];
  peopleWaiting?: number;
  duration?: string;
}

export default function StationsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [userTicketsCount, setUserTicketsCount] = useState(0);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    fetchStations();
    const interval = setInterval(fetchStations, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const res = await fetch('/api/tickets');
        if (!res.ok) return;
        const data: unknown = await res.json();
        if (Array.isArray(data)) setUserTicketsCount(data.length);
      } catch {}
    };
    if (session) fetchMyTickets();
  }, [session]);

  const fetchStations = async () => {
    try {
      const response = await fetch(`/api/stations`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data: Station[] = await response.json();
        setStations(data);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
      toast.error('Erreur lors du chargement des stations');
    } finally {
      setLoading(false);
    }
  };


  if (isPending || loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-white">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Nombre de stations ouvertes
  const openStationsCount = stations.filter((s) => s.status === 'open').length;
  const activeReservations = userTicketsCount;

  // Fonction pour couleurs des badges carburant (conserver si vous avez les données)
  const getFuelBadgeColor = (fuel: string) => {
    switch (fuel.toLowerCase()) {
      case 'essence':
        return 'bg-yellow-100 text-yellow-600';
      case 'diesel':
        return 'bg-blue-100 text-blue-600';
      case 'super':
        return 'bg-purple-200 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header bleu */}
      <header className="bg-blue-600 p-6 rounded-b-3xl shadow-lg text-white select-none">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-400 rounded-xl p-2">
            <Fuel strokeWidth={1.5} size={24} />
          </div>
          <h1 className="font-bold text-xl">JigiFuel</h1>
        </div>
        <p className="text-sm opacity-90">Carburant disponible près de vous</p>

        <div className="mt-6 bg-blue-500 bg-opacity-50 rounded-xl p-4">
          <p className="text-xs opacity-80">Bienvenue,</p>
          <p className="font-semibold text-lg">{session?.user?.name || 'Utilisateur Demo'}</p>
        </div>
      </header>

      {/* Résumé Disponibles & Réservations */}
      <main className="flex flex-col flex-1 px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex gap-4 mb-6">
          {/* Stations Disponibles */}
          <div className="bg-white rounded-xl shadow-md flex-1 p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-green-500">
              <Zap size={20} />
              <span className="text-sm font-medium text-gray-600">Disponibles</span>
            </div>
            <p className="text-3xl font-bold">{openStationsCount}</p>
            <p className="text-xs text-gray-400">Stations ouvertes</p>
          </div>

          {/* Réservations Actives */}
          <div className="bg-white rounded-xl shadow-md flex-1 p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-500">
              <ArrowUpRight size={20} />
              <span className="text-sm font-medium text-gray-600">Mes tickets</span>
            </div>
            <p className="text-3xl font-bold">{activeReservations}</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
        </div>

        {/* Stations Proches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-1 text-gray-900">
              <MapPin size={20} className="text-blue-600" />
              Stations Proches
            </h2>
            <button
              onClick={() => router.push('/map')}
              className="text-blue-600 font-medium hover:underline text-sm"
              aria-label="Voir la carte"
            >
              Carte &rarr;
            </button>
          </div>

          {/* Liste des stations */}
          {stations.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-4">
                <Store className="w-16 h-16 sm:w-20 sm:h-20 text-[#FF7A00]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-2">
                Aucune station disponible
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280] mb-6">
                Les stations apparaîtront ici une fois ajoutées
              </p>
              <button
                onClick={fetchStations}
                className="bg-[#FF7A00] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl hover:bg-[#E66D00] transition-all text-sm sm:text-base flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Recharger
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {stations.map((station) => (
                <button
                  key={station.id}
                  className="bg-white rounded-2xl shadow-sm p-5 text-left transition-all border border-gray-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  onClick={() => router.push(`/stations/${station.id}`)}
                  aria-label={`Station ${station.name}, ${station.status === 'open' ? 'ouverte' : 'fermée'}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{station.name}</h3>
                      {station.address && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin size={16} /> {station.address}
                        </p>
                      )}
                      {station.mapsCode && (
                        <p className="text-xs text-gray-500 mt-1 break-all">{station.mapsCode}</p>
                      )}
                    </div>
                    <span className={`mt-1 inline-block h-2.5 w-2.5 rounded-full ${station.status === 'open' ? 'bg-green-500' : 'bg-red-400'}`} />
                  </div>

                  {station.fuels && station.fuels.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {station.fuels.map((fuel) => (
                        <span
                          key={fuel}
                          className={`text-xs font-semibold px-3 py-1 rounded-md ${getFuelBadgeColor(fuel)}`}
                        >
                          {fuel}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 text-right text-gray-400 text-sm">›</div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <MiniTabNav />

      <div className="h-16" />
    </div>
  );
}
