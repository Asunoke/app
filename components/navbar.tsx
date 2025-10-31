'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const isActive = (path: string) => pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-md border-b border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FF7A00] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-xl font-bold text-[#1A1A1A]">JigiFuel</span>
            </Link>

            <div className="hidden md:flex space-x-4">
              {session && (
                <>
                  <Link
                    href="/dashboard/v1"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/dashboard/v1') 
                        ? 'text-[#FF7A00] bg-orange-50' 
                        : 'text-[#6B7280] hover:text-[#FF7A00]'
                    }`}
                  >
                    Stations
                  </Link>
                  <Link
                    href="/tickets"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/tickets') 
                        ? 'text-[#FF7A00] bg-orange-50' 
                        : 'text-[#6B7280] hover:text-[#FF7A00]'
                    }`}
                  >
                    Mes Tickets
                  </Link>
                  {((session.user as any).role === 'ADMIN' || (session.user as any).role === 'MANAGER') && (
                    <Link
                      href="/dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive('/dashboard') 
                          ? 'text-[#FF7A00] bg-orange-50' 
                          : 'text-[#6B7280] hover:text-[#FF7A00]'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                </>
              )}
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-[#FF7A00] bg-orange-50' 
                    : 'text-[#6B7280] hover:text-[#FF7A00]'
                }`}
              >
                Accueil
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <div className="hidden md:block text-sm text-[#6B7280]">
                  {session.user.email}
                </div>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="hidden md:flex">
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="primary" size="sm">
                  Connexion
                </Button>
              </Link>
            )}

            {/* Bouton menu hamburger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#6B7280] hover:text-[#FF7A00] hover:bg-orange-50 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E0E0E0]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-[#FF7A00] bg-orange-50' 
                    : 'text-[#6B7280] hover:text-[#FF7A00] hover:bg-orange-50'
                }`}
                onClick={closeMobileMenu}
              >
                Accueil
              </Link>
              
              {session && (
                <>
                  <Link
                    href="/dashboard/v1"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/dashboard/v1') 
                        ? 'text-[#FF7A00] bg-orange-50' 
                        : 'text-[#6B7280] hover:text-[#FF7A00] hover:bg-orange-50'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Stations
                  </Link>
                  <Link
                    href="/tickets"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/tickets') 
                        ? 'text-[#FF7A00] bg-orange-50' 
                        : 'text-[#6B7280] hover:text-[#FF7A00] hover:bg-orange-50'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Mes Tickets
                  </Link>
                  {((session.user as any).role === 'ADMIN' || (session.user as any).role === 'MANAGER') && (
                    <Link
                      href="/dashboard"
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive('/dashboard') 
                          ? 'text-[#FF7A00] bg-orange-50' 
                          : 'text-[#6B7280] hover:text-[#FF7A00] hover:bg-orange-50'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <div className="pt-4 border-t border-[#E0E0E0] mt-4">
                    <div className="px-3 py-2 text-sm text-[#6B7280]">
                      {session.user.email}
                    </div>
                    <Button 
                      onClick={() => {
                        handleSignOut();
                        closeMobileMenu();
                      }} 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2"
                    >
                      Déconnexion
                    </Button>
                  </div>
                </>
              )}

              {!session && (
                <div className="pt-4">
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button variant="primary" size="sm" className="w-full">
                      Connexion
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
