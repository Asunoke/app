'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, MapPin, DollarSign, User } from 'lucide-react';

export default function MiniTabNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const item = (
    icon: React.ReactNode,
    label: string,
    path: string,
  ) => (
    <button
      className={`flex flex-col items-center gap-0.5 md:px-2 ${isActive(path) ? 'text-blue-600' : 'hover:text-blue-600'}`}
      onClick={() => router.push(path)}
      aria-label={label}
      aria-current={isActive(path) ? 'page' : undefined}
      type="button"
    >
      {icon}
      <span className="text-[10px] md:text-xs">{label}</span>
    </button>
  );

  return (
    <nav aria-label="Barre de navigation principale" className="fixed bottom-0 left-0 right-0 z-30 select-none">
      <div className="bg-white shadow-inner border-t border-gray-200 px-6 py-2 flex justify-between text-gray-500 md:justify-center md:py-2">
        <div className="w-full flex justify-between md:w-auto md:justify-center md:gap-4 md:px-2 md:rounded-full">
          {item(<Home size={20} className="md:size-5" />, 'Accueil', '/dashboard/v1')}
          {item(<MapPin size={20} className="md:size-5" />, 'Carte', '/map')}
          {item(<DollarSign size={20} className="md:size-5" />, 'Tickets', '/tickets')}
          {item(<User size={20} className="md:size-5" />, 'Profil', '/profile')}
        </div>
      </div>
    </nav>
  );
}
