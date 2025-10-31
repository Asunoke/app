'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4">📡</div>
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">
            Vous êtes hors ligne
          </h1>
          <p className="text-lg text-[#6B7280] mb-8">
            Vérifiez votre connexion internet et réessayez
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            className="w-full"
          >
            🔄 Réessayer
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
          >
            🏠 Retour à l&apos;accueil
          </Button>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Astuce</h3>
          <p className="text-sm text-blue-800">
            JigiFuel fonctionne mieux avec une connexion internet active.
            Certaines fonctionnalités sont disponibles hors ligne grâce à la mise en cache.
          </p>
        </div>
      </div>
    </div>
  );
}
