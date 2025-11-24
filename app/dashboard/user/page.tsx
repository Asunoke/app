'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MiniTabNav from '@/components/mini-tab-nav';
import toast from 'react-hot-toast';
import type { User as PrismaUser } from '@prisma/client';

interface User {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export default function UsersDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [users, setUsers] = useState<User[]>([]);
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
    if (session) fetchUsers();
  }, [session]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Erreur chargement utilisateurs');
      const data = (await res.json()) as User[];
      setUsers(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Impossible de charger les utilisateurs';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: 'ADMIN' | 'MANAGER' | 'USER') => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast.error((j as { error?: string })?.error || 'Impossible de mettre à jour le rôle');
        return;
      }
      toast.success('Rôle mis à jour');
      fetchUsers();
    } catch (e) {
      console.error(e);
      toast.error('Erreur côté client');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast.error((j as { error?: string })?.error || 'Suppression impossible');
        return;
      }
      toast.success('Utilisateur supprimé');
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      console.error(e);
      toast.error('Erreur côté client');
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
        <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>

        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Nom</th>
                    <th className="text-left py-3 px-4">Rôle</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.name || '-'}</td>
                      <td className="py-3 px-4">
                        <select
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                          value={user.role}
                          onChange={(e) =>
                            updateUserRole(user.id, e.target.value as 'ADMIN' | 'MANAGER' | 'USER')
                          }
                        >
                          <option value="USER">USER</option>
                          <option value="MANAGER">MANAGER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="text-red-600 hover:text-red-700 text-sm"
                          onClick={() => deleteUser(user.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
