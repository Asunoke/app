'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Mail, LogOut, Shield, Settings, Users, Ticket } from 'lucide-react';
import MiniTabNav from '@/components/mini-tab-nav';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const user = session?.user as { 
    name?: string | null; 
    email?: string | null; 
    role?: string | null;
  } | undefined;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 pb-20">
      <div className="bg-[#FF7A00] text-white px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
        <div className="mt-4 bg-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{user?.name ?? 'Utilisateur'}</div>
              <div className="text-sm opacity-90">{user?.email ?? ''}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-10 px-4 sm:px-6 lg:px-8 space-y-6">
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium text-gray-900">{user?.email ?? ''}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Admin/Manager Quick Links */}
        {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 text-xs font-semibold text-gray-500">
              {user.role === 'ADMIN' ? 'ADMINISTRATION' : 'GESTION'}
            </div>
            <div className="divide-y divide-gray-200">
              {user.role === 'ADMIN' && (
                <>
                  <div
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push('/dashboard')}
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                      <Shield size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Tableau de bord Admin</div>
                      <div className="text-xs text-gray-500">Gestion complète du système</div>
                    </div>
                    <div className="text-gray-400">›</div>
                  </div>
                  <div
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push('/dashboard/user')}
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <Users size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Gestion des utilisateurs</div>
                      <div className="text-xs text-gray-500">Voir et gérer les comptes</div>
                    </div>
                    <div className="text-gray-400">›</div>
                  </div>
                  <div
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push('/dashboard/payments')}
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                      <Settings size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">Paiements</div>
                      <div className="text-xs text-gray-500">Suivre les paiements des tickets</div>
                    </div>
                    <div className="text-gray-400">›</div>
                  </div>
                </>
              )}
              {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
                <div
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(user.role === 'ADMIN' ? '/dashboard/stations' : '/dashboard/tickets')}
                >
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    {user.role === 'ADMIN' ? <Settings size={18} /> : <Ticket size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {user.role === 'ADMIN' ? 'Gestion des stations' : 'Gestion des tickets'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.role === 'ADMIN' ? 'Gérer toutes les stations' : 'Valider les tickets'}
                    </div>
                  </div>
                  <div className="text-gray-400">›</div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 text-xs font-semibold text-gray-500">GÉNÉRAL</div>
          <div className="divide-y divide-gray-200">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div className="text-sm font-medium text-gray-900">Paramètres</div>
              <div className="text-gray-400">›</div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div className="text-sm font-medium text-gray-900">Notifications</div>
              <div className="text-gray-400">›</div>
            </div>
          </div>
          <div className="p-4">
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Se Déconnecter
            </Button>
          </div>
        </section>
      </div>

      <MiniTabNav />

      <div className="h-16" />
    </div>
  );
}
