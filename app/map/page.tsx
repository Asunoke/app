'use client';

import MiniTabNav from '@/components/mini-tab-nav';

export default function MapComingSoonPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <h1 className="text-3xl font-bold">Carte</h1>
        <p className="text-white/90 mt-2">Bientôt disponible</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600">La carte interactive arrive très bientôt. Merci pour votre patience.</p>
        </div>
      </div>

      <MiniTabNav />
      <div className="h-16" />
    </div>
  );
}
