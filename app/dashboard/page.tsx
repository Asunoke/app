'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface Station {
  id: string;
  name: string;
  code: string;
  mapsCode: string;
  address?: string;
  status: string;
  manager?: User;
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState<'validate' | 'stations' | 'users'>('validate');
  const [ticketId, setTicketId] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateStation, setShowCreateStation] = useState(false);
  const [newStation, setNewStation] = useState({
    name: '',
    code: '',
    mapsCode: '',
    address: '',
    managerId: '',
  });
  const [managers, setManagers] = useState<User[]>([]);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [showEditStation, setShowEditStation] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
      return;
    }

    // Type assertion to access role - will be fixed with proper Better Auth types
    const userRole = (session?.user as any)?.role;
    if (session && userRole !== 'ADMIN' && userRole !== 'MANAGER') {
      router.push('/');
      toast.error('Accès non autorisé');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      const userRole = (session.user as any)?.role;
      if (userRole === 'ADMIN') {
        fetchStations();
        fetchUsers();
      } else if (userRole === 'MANAGER') {
        // Les managers chargent aussi les stations pour voir leur propre station
        fetchStations();
      }
    }
  }, [session]);

  useEffect(() => {
    // Filtrer les managers de la liste des utilisateurs
    const managersList = users.filter((u) => u.role === 'MANAGER' || u.role === 'ADMIN');
    setManagers(managersList);
  }, [users]);

  const fetchStations = async () => {
    try {
      const response = await fetch('/api/stations');
      if (response.ok) {
        const data = await response.json();
        setStations(data);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const handleValidateTicket = async (action: 'validate' | 'reject') => {
    if (!ticketId.trim()) {
      toast.error('Veuillez entrer un ID de ticket');
      return;
    }

    try {
      const response = await fetch('/api/tickets/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId, action }),
      });

      if (response.ok) {
        toast.success(
          action === 'validate' ? 'Ticket validé' : 'Ticket rejeté'
        );
        setTicketId('');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Erreur lors de la validation');
      }
    } catch (error) {
      console.error('Error validating ticket:', error);
      toast.error('Erreur lors de la validation du ticket');
    }
  };

  const handleEditStation = (station: Station) => {
    setEditingStation(station);
    setNewStation({
      name: station.name,
      code: station.code,
      mapsCode: station.mapsCode,
      address: station.address || '',
      managerId: station.manager?.id || '',
    });
    setShowEditStation(true);
    setShowCreateStation(false);
  };

  const handleUpdateStation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingStation) return;

    try {
      const response = await fetch(`/api/stations/${editingStation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStation),
      });

      if (response.ok) {
        toast.success('Station mise à jour avec succès');
        setShowEditStation(false);
        setEditingStation(null);
        setNewStation({
          name: '',
          code: '',
          mapsCode: '',
          address: '',
          managerId: '',
        });
        fetchStations();
      } else {
        toast.error('Erreur lors de la mise à jour de la station');
      }
    } catch (error) {
      console.error('Error updating station:', error);
      toast.error('Erreur lors de la mise à jour de la station');
    }
  };

  const handleDeleteStation = async (stationId: string, stationName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la station "${stationName}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/stations/${stationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Station supprimée avec succès');
        fetchStations();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting station:', error);
      toast.error('Erreur lors de la suppression de la station');
    }
  };

  const handleToggleStationStatus = async (stationId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    
    try {
      const station = stations.find(s => s.id === stationId);
      if (!station) return;

      const response = await fetch(`/api/stations/${stationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...station,
          status: newStatus,
        }),
      });

      if (response.ok) {
        toast.success(`Station ${newStatus === 'open' ? 'ouverte' : 'fermée'}`);
        fetchStations();
      } else {
        toast.error('Erreur lors du changement de statut');
      }
    } catch (error) {
      console.error('Error toggling station status:', error);
      toast.error('Erreur lors du changement de statut');
    }
  };

  const handleCreateStation = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/stations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStation),
      });

      if (response.ok) {
        toast.success('Station créée avec succès');
        setShowCreateStation(false);
        setNewStation({
          name: '',
          code: '',
          mapsCode: '',
          address: '',
          managerId: '',
        });
        fetchStations();
      } else {
        toast.error('Erreur lors de la création de la station');
      }
    } catch (error) {
      console.error('Error creating station:', error);
      toast.error('Erreur lors de la création de la station');
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#6B7280]">Chargement...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userRole = (session.user as any)?.role;

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">
          Dashboard {userRole === 'ADMIN' ? 'Administrateur' : 'Manager'}
        </h1>

        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('validate')}
            variant={activeTab === 'validate' ? 'primary' : 'outline'}
          >
            Valider Tickets
          </Button>
          {userRole === 'MANAGER' && (
            <Button
              onClick={() => setActiveTab('stations')}
              variant={activeTab === 'stations' ? 'primary' : 'outline'}
            >
              Ma Station
            </Button>
          )}
          {userRole === 'ADMIN' && (
            <>
              <Button
                onClick={() => setActiveTab('stations')}
                variant={activeTab === 'stations' ? 'primary' : 'outline'}
              >
                Stations
              </Button>
              <Button
                onClick={() => setActiveTab('users')}
                variant={activeTab === 'users' ? 'primary' : 'outline'}
              >
                Utilisateurs
              </Button>
            </>
          )}
        </div>

        {activeTab === 'validate' && (
          <Card>
            <CardHeader>
              <CardTitle>Valider un Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="text"
                  label="ID du Ticket"
                  placeholder="Entrez l'ID du ticket"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                  className="font-mono"
                />
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleValidateTicket('validate')}
                    variant="primary"
                    className="flex-1"
                  >
                    Valider
                  </Button>
                  <Button
                    onClick={() => handleValidateTicket('reject')}
                    variant="danger"
                    className="flex-1"
                  >
                    Rejeter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'stations' && userRole === 'ADMIN' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Stations</h2>
              <Button
                onClick={() => setShowCreateStation(!showCreateStation)}
                variant="primary"
              >
                {showCreateStation ? 'Annuler' : 'Créer une Station'}
              </Button>
            </div>

            {showEditStation && editingStation && (
              <Card>
                <CardHeader>
                  <CardTitle>Modifier la Station: {editingStation.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateStation} className="space-y-4">
                    <Input
                      label="Nom de la station"
                      placeholder="Ex: Station Total Hippodrome"
                      value={newStation.name}
                      onChange={(e) =>
                        setNewStation({ ...newStation, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Code de la station"
                      placeholder="Ex: TOTAL-HIP"
                      value={newStation.code}
                      onChange={(e) =>
                        setNewStation({ ...newStation, code: e.target.value.toUpperCase() })
                      }
                      required
                    />
                    
                    <Input
                      label="Code Google Maps"
                      placeholder="Ex: M4H8+H57"
                      value={newStation.mapsCode}
                      onChange={(e) =>
                        setNewStation({ ...newStation, mapsCode: e.target.value })
                      }
                      required
                    />
                    
                    <Input
                      label="Adresse complète (optionnel)"
                      placeholder="Ex: Avenue de la Marne, Hippodrome"
                      value={newStation.address}
                      onChange={(e) =>
                        setNewStation({ ...newStation, address: e.target.value })
                      }
                    />
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                        Manager
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                        value={newStation.managerId}
                        onChange={(e) =>
                          setNewStation({ ...newStation, managerId: e.target.value })
                        }
                      >
                        <option value="">Aucun manager</option>
                        {managers.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name || user.email} ({user.role})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" variant="primary" className="flex-1">
                        Mettre à jour
                      </Button>
                      <Button 
                        type="button" 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => {
                          setShowEditStation(false);
                          setEditingStation(null);
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {showCreateStation && (
              <Card>
                <CardHeader>
                  <CardTitle>Nouvelle Station</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateStation} className="space-y-4">
                    <Input
                      label="Nom de la station"
                      placeholder="Ex: Station Total Hippodrome"
                      value={newStation.name}
                      onChange={(e) =>
                        setNewStation({ ...newStation, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Code de la station"
                      placeholder="Ex: TOTAL-HIP"
                      value={newStation.code}
                      onChange={(e) =>
                        setNewStation({ ...newStation, code: e.target.value.toUpperCase() })
                      }
                      required
                    />
                    
                    <Input
                      label="Code Google Maps"
                      placeholder="Ex: M4H8+H57"
                      value={newStation.mapsCode}
                      onChange={(e) =>
                        setNewStation({ ...newStation, mapsCode: e.target.value })
                      }
                      required
                    />
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-semibold text-blue-900">
                        💡 Comment obtenir un Code Google Maps ?
                      </p>
                      <ol className="text-xs text-blue-800 space-y-1 ml-4 list-decimal">
                        <li>Ouvrez <a href="https://www.google.com/maps/@12.6392,-8.0029,13z" target="_blank" className="underline text-blue-600">Google Maps</a></li>
                        <li>Trouvez la localisation exacte de la station</li>
                        <li>Appuyez longuement (mobile) ou clic droit (PC) sur le point</li>
                        <li>Le Plus Code apparaît en haut (ex: M4H8+H57)</li>
                        <li>Copiez-le et collez-le dans le champ ci-dessus</li>
                      </ol>
                    </div>
                    
                    <Input
                      label="Adresse complète (optionnel)"
                      placeholder="Ex: Avenue de la Marne, Hippodrome"
                      value={newStation.address}
                      onChange={(e) =>
                        setNewStation({ ...newStation, address: e.target.value })
                      }
                    />
                    <div>
                      <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
                        Manager
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
                        value={newStation.managerId}
                        onChange={(e) =>
                          setNewStation({ ...newStation, managerId: e.target.value })
                        }
                      >
                        <option value="">Aucun manager</option>
                        {managers.length === 0 ? (
                          <option disabled>Aucun manager disponible</option>
                        ) : (
                          managers.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name || user.email} ({user.role})
                            </option>
                          ))
                        )}
                      </select>
                      <p className="text-xs text-[#6B7280] mt-1">
                        {managers.length} manager(s) disponible(s)
                      </p>
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                      Créer la Station
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stations.map((station) => (
                <Card key={station.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{station.name}</CardTitle>
                      <Badge
                        variant={station.status === 'open' ? 'success' : 'error'}
                      >
                        {station.status === 'open' ? 'Ouvert' : 'Fermé'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-[#6B7280]">
                        Code: {station.code}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Code Maps: <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.mapsCode)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {station.mapsCode}
                        </a>
                      </p>
                      {station.address && (
                        <p className="text-sm text-[#6B7280]">
                          {station.address}
                        </p>
                      )}
                      {station.manager && (
                        <p className="text-sm text-[#6B7280]">
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
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditStation(station)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          ✏️ Modifier
                        </Button>
                        <Button
                          onClick={() => handleDeleteStation(station.id, station.name)}
                          variant="danger"
                          size="sm"
                          className="flex-1"
                        >
                          🗑️ Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stations' && userRole === 'MANAGER' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Ma Station</h2>
            {stations.filter(s => s.manager?.id === session.user.id).map((station) => (
              <Card key={station.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{station.name}</CardTitle>
                    <Badge
                      variant={station.status === 'open' ? 'success' : 'error'}
                    >
                      {station.status === 'open' ? 'Ouvert' : 'Fermé'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-[#6B7280]">
                        <strong>Code:</strong> {station.code}
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        <strong>Code Maps:</strong>{' '}
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.mapsCode)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {station.mapsCode}
                        </a>
                      </p>
                      {station.address && (
                        <p className="text-sm text-[#6B7280]">
                          <strong>Adresse:</strong> {station.address}
                        </p>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-[#E0E0E0]">
                      <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3">
                        Modifier le statut de la station
                      </h3>
                      <Button
                        onClick={() => handleToggleStationStatus(station.id, station.status)}
                        variant={station.status === 'open' ? 'secondary' : 'primary'}
                        className="w-full"
                      >
                        {station.status === 'open' ? '🔒 Fermer la station' : '🔓 Ouvrir la station'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {stations.filter(s => s.manager?.id === session.user.id).length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-[#6B7280]">
                    Aucune station n'est assignée à votre compte.
                  </p>
                  <p className="text-sm text-[#9CA3AF] mt-2">
                    Contactez un administrateur pour vous assigner une station.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'users' && userRole === 'ADMIN' && (
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E0E0E0]">
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Nom</th>
                      <th className="text-left py-3 px-4">Rôle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[#E0E0E0]">
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.name || '-'}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              user.role === 'ADMIN'
                                ? 'error'
                                : user.role === 'MANAGER'
                                ? 'warning'
                                : 'default'
                            }
                          >
                            {user.role}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
