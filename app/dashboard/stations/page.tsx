'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MiniTabNav from '@/components/mini-tab-nav';
import toast from 'react-hot-toast';
import type { User as PrismaUser } from '@prisma/client';

interface Station {
  id: string;
  name: string;
  code: string;
  mapsCode: string;
  address?: string;
  status: string;
  manager?: {
    id: string;
    email: string;
    name?: string | null;
  } | null;
}

export default function StationsDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending) {
      const role = (session?.user as PrismaUser | undefined)?.role;
      if (!session) {
        router.push('/login');
      } else if (role !== 'ADMIN') {
        toast.error('Accès réservé à l\u2019administrateur');
        router.push('/');
      }
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) fetchStations();
  }, [session]);

  const fetchStations = async () => {
    try {
      const res = await fetch('/api/stations');
      if (!res.ok) throw new Error('Erreur chargement stations');
      const data = (await res.json()) as Station[];
      setStations(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Impossible de charger les stations';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStationStatus = async (stationId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';

    try {
      const station = stations.find((s) => s.id === stationId);
      if (!station) return;

      const res = await fetch(`/api/stations/${stationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...station,
          status: newStatus,
        }),
      });

      if (res.ok) {
        toast.success(`Station ${newStatus === 'open' ? 'ouverte' : 'fermée'}`);
        fetchStations();
      } else {
        toast.error('Erreur lors du changement de statut');
      }
    } catch (e) {
      console.error('Error toggling station status:', e);
      toast.error('Erreur lors du changement de statut');
    }
  };

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
        <h1 className="text-2xl font-bold mb-4">Gestion des stations</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stations.map((station) => (
            <Card key={station.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{station.name}</CardTitle>
                  <Badge variant={station.status === 'open' ? 'success' : 'error'}>
                    {station.status === 'open' ? 'Ouvert' : 'Fermé'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">Code: {station.code}</p>
                  <p className="text-sm text-gray-600">
                    Code Maps:{' '}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        station.mapsCode,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {station.mapsCode}
                    </a>
                  </p>
                  {station.address && (
                    <p className="text-sm text-gray-600">{station.address}</p>
                  )}
                  {station.manager && (
                    <p className="text-sm text-gray-600">
                      Manager: {station.manager.name || station.manager.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleToggleStationStatus(station.id, station.status)}
                    variant={station.status === 'open' ? 'secondary' : 'primary'}
                    size="sm"
                    className="w-full"
                  >
                    {station.status === 'open' ? '🔒 Fermer' : '🔓 Ouvrir'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {stations.length === 0 && (
            <p className="text-gray-500 col-span-full">Aucune station trouvée.</p>
          )}
        </div>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
