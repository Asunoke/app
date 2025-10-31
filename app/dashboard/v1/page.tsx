'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { Fuel, RefreshCw, Store, Ticket, Navigation, MapPin, Circle } from 'lucide-react';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

interface Station {
  id: string;
  name: string;
  code: string;
  mapsCode: string;
  status: string;
  address?: string;
}

export default function StationsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    fetchStations();
    
    // Rafraîchir les stations toutes les 30 secondes
    const interval = setInterval(() => {
      fetchStations();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchStations = async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`/api/stations?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(`📍 ${data.length} station(s) chargée(s) à ${new Date().toLocaleTimeString()}`);
        setStations(data);
        setLastUpdate(timestamp);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
      toast.error('Erreur lors du chargement des stations');
    } finally {
      setLoading(false);
    }
  };

  const handleStartNavigation = (station: Station) => {
    // Créer l'URL Google Maps avec le code maps de la station
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.mapsCode)}`;
    
    // Ouvrir dans un nouvel onglet
    window.open(googleMapsUrl, '_blank');
    
    toast.success(`Navigation vers ${station.name} lancée !`);
  };

  const handleReserveTicket = async (stationId: string) => {
    if (!session) {
      toast.error('Vous devez être connecté pour réserver un ticket');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stationId }),
      });

      if (response.ok) {
        const ticket = await response.json();
        toast.success('Ticket réservé avec succès!');
        router.push('/tickets');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Error reserving ticket:', error);
      toast.error('Erreur lors de la réservation du ticket');
    }
  };

  if (isPending || loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-[#6B7280]">Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
              <Fuel className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF7A00]" />
              Stations de Carburant
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280]">
              Trouvez et réservez votre carburant à Bamako
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md border border-[#E0E0E0]">
              <p className="text-xs sm:text-sm text-[#6B7280]">Stations disponibles</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#FF7A00]">{stations.length}</p>
            </div>
            <button
              onClick={() => {
                fetchStations();
                toast.success('Liste mise à jour');
              }}
              className="bg-white hover:bg-gray-50 text-[#FF7A00] font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md border border-[#E0E0E0] transition-all text-sm sm:text-base flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </button>
          </div>
        </div>

        {/* Liste des stations */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
              <p className="text-sm sm:text-base text-[#6B7280]">Chargement des stations...</p>
            </div>
          </div>
        ) : stations.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stations.map((station) => (
              <div
                key={station.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-[#E0E0E0]"
              >
                {/* Header de la carte */}
                <div className="bg-gradient-to-r from-[#FF7A00] to-[#FF9500] p-4 sm:p-6 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold">{station.name}</h3>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        station.status === 'open'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      <Circle className={`w-3 h-3 inline-block mr-1 ${station.status === 'open' ? 'fill-white' : 'fill-white'}`} />
                      {station.status === 'open' ? 'Ouvert' : 'Fermé'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm opacity-90">Code: {station.code}</p>
                </div>

                {/* Contenu de la carte */}
                <div className="p-4 sm:p-6">
                  {station.address && (
                    <div className="flex items-start gap-2 mb-4 text-[#6B7280]">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm">{station.address}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mb-4 sm:mb-6 text-xs text-[#9CA3AF]">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="font-mono">
                      {station.mapsCode}
                    </span>
                  </div>

                  {/* Boutons d'action */}
                  <div className="space-y-2 sm:space-y-3">
                    <button
                      onClick={() => handleReserveTicket(station.id)}
                      disabled={station.status !== 'open'}
                      className={`w-full py-2 sm:py-3 px-4 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                        station.status === 'open'
                          ? 'bg-[#FF7A00] text-white hover:bg-[#E66D00] shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Ticket className="inline-block mr-2 w-4 h-4" />
                      Réserver un Ticket
                    </button>

                    <button
                      onClick={() => handleStartNavigation(station)}
                      className="w-full py-2 sm:py-3 px-4 rounded-xl font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      <Navigation className="inline-block mr-2 w-4 h-4" />
                      Démarrer le Trajet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-[#9CA3AF]">
          <p>Dernière mise à jour : {new Date(lastUpdate).toLocaleTimeString()}</p>
          <p className="mt-1">Mise à jour automatique toutes les 30 secondes</p>
        </div>
      </div>
    </div>
  );
}
