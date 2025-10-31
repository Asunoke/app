'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Ticket, 
  MapPin, 
  Zap, 
  Smartphone, 
  Code, 
  Palette, 
  Headphones,
  Rocket,
  Fuel,
  Navigation,
  RefreshCw,
  Mail,
  Globe,
  Target,
  Lightbulb,
  Handshake
} from 'lucide-react';

export default function AboutPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({
    users: 0,
    stations: 0,
    tickets: 0,
    satisfaction: 99
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Ticket,
      title: 'Réservation Facile',
      description: 'Réservez votre carburant en quelques clics et évitez les files d\'attente',
    },
    {
      icon: MapPin,
      title: 'Localisation en Temps Réel',
      description: 'Trouvez les stations les plus proches avec Google Maps intégré',
    },
    {
      icon: Zap,
      title: 'Rapide et Sécurisé',
      description: 'Transactions sécurisées et validation instantanée de vos tickets',
    },
    {
      icon: Smartphone,
      title: 'Application Mobile',
      description: 'Installez JigiFuel sur votre téléphone comme une application native',
    },
  ];

  const statsDisplay = [
    { value: loading ? '...' : `${stats.users}+`, label: 'Utilisateurs actifs' },
    { value: loading ? '...' : `${stats.stations}+`, label: 'Stations partenaires' },
    { value: loading ? '...' : `${stats.tickets}+`, label: 'Tickets réservés' },
    { value: loading ? '...' : `${stats.satisfaction}%`, label: 'Satisfaction client' },
  ];

  const team = [
    {
      role: 'Développement',
      description: 'Solutions technologiques innovantes',
      icon: Code,
    },
    {
      role: 'Design',
      description: 'Interface utilisateur moderne et intuitive',
      icon: Palette,
    },
    {
      role: 'Support',
      description: 'Assistance client 24/7',
      icon: Headphones,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FF7A00] via-[#FF9500] to-[#FFB800] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Bienvenue sur <span className="text-yellow-200">JigiFuel</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              La solution moderne pour réserver votre carburant à Bamako
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button 
                  variant="secondary" 
                  className="bg-white text-[#FF7A00] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl w-full sm:w-auto"
                >
                  <Rocket className="inline-block mr-2 h-5 w-5" />
                  Commencer Maintenant
                </Button>
              </Link>
              <Link href="/dashboard/v1">
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-[#FF7A00] px-8 py-6 text-lg font-semibold rounded-xl w-full sm:w-auto"
                >
                  <Fuel className="inline-block mr-2 h-5 w-5" />
                  Voir les Stations
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {statsDisplay.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FF7A00] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-[#6B7280]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              Pourquoi choisir JigiFuel ?
            </h2>
            <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto">
              Une plateforme complète pour simplifier votre quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  activeFeature === index ? 'ring-4 ring-[#FF7A00] shadow-2xl' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <Card>
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <feature.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF7A00]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B7280]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg sm:text-xl text-[#6B7280]">
              Simple, rapide et efficace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF7A00] text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6 text-[#FF7A00]" />
                Trouvez une station
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280]">
                Consultez la carte interactive et choisissez la station la plus proche de vous
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF7A00] text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center justify-center gap-2">
                <Ticket className="w-6 h-6 text-[#FF7A00]" />
                Réservez votre ticket
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280]">
                Cliquez sur "Réserver un ticket" et obtenez votre code de réservation instantanément
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF7A00] text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-4 flex items-center justify-center gap-2">
                <Fuel className="w-6 h-6 text-[#FF7A00]" />
                Récupérez votre carburant
              </h3>
              <p className="text-sm sm:text-base text-[#6B7280]">
                Présentez votre ticket à la station et faites le plein sans attendre
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Florynx Labs Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block mb-6">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#FF7A00] to-[#FFB800] bg-clip-text text-transparent">
                Florynx Labs SARL
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Innovation technologique au service de votre quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {team.map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <item.icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#FFB800]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {item.role}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-12 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  À propos de Florynx Labs
                </h3>
                <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  Florynx Labs SARL est une entreprise malienne spécialisée dans le développement 
                  de solutions technologiques innovantes. Notre mission est de simplifier la vie 
                  quotidienne des Maliens grâce à des applications web et mobiles modernes.
                </p>
                <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  JigiFuel est notre première application dédiée à la gestion intelligente du 
                  carburant à Bamako. Nous continuons d'innover pour apporter des solutions 
                  pratiques aux défis du quotidien.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#FF7A00] hover:bg-[#E66D00] text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl w-full sm:w-auto">
                    <Mail className="inline-block mr-2 h-5 w-5" />
                    Nous Contacter
                  </Button>
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl w-full sm:w-auto">
                    <Globe className="inline-block mr-2 h-5 w-5" />
                    En Savoir Plus
                  </Button>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF7A00]" />
                    <h4 className="text-lg sm:text-xl font-bold">Notre Vision</h4>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300">
                    Devenir le leader des solutions technologiques au Mali
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF7A00]" />
                    <h4 className="text-lg sm:text-xl font-bold">Notre Mission</h4>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300">
                    Simplifier la vie quotidienne par l'innovation technologique
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <Handshake className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF7A00]" />
                    <h4 className="text-lg sm:text-xl font-bold">Nos Valeurs</h4>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300">
                    Innovation, Excellence, Intégrité et Service client
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#FF7A00] to-[#FFB800]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12">
            Rejoignez des milliers d'utilisateurs qui font confiance à JigiFuel
          </p>
          <Link href="/register">
            <Button className="bg-white text-[#FF7A00] hover:bg-gray-100 px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <Rocket className="inline-block mr-2 h-6 w-6" />
              Créer mon compte gratuitement
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#FF7A00]">JigiFuel</h3>
              <p className="text-sm sm:text-base text-gray-400">
                La solution moderne pour réserver votre carburant à Bamako
              </p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Accueil</Link></li>
                <li><Link href="/dashboard/v1" className="text-gray-400 hover:text-white transition-colors">Stations</Link></li>
                <li><Link href="/tickets" className="text-gray-400 hover:text-white transition-colors">Mes Tickets</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm sm:text-base">
                <li><Link href="/register" className="text-gray-400 hover:text-white transition-colors">Créer un compte</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Se connecter</Link></li>
                <li><a href="mailto:contact@florynxlabs.com" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Florynx Labs SARL</h4>
              <p className="text-sm sm:text-base text-gray-400 mb-2">
                Bamako, Mali
              </p>
              <p className="text-sm sm:text-base text-gray-400">
                contact@florynxlabs.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-sm sm:text-base text-gray-400">
              © 2025 JigiFuel - Développé par <span className="text-[#FF7A00] font-semibold">Florynx Labs SARL</span>. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
