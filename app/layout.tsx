import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "JigiFuel - Réservation de Carburant à Bamako | Station-Service en Ligne",
    template: "%s | JigiFuel",
  },
  description: "JigiFuel est la plateforme #1 de réservation de carburant à Bamako, Mali. Trouvez les stations-service à proximité, réservez votre ticket en ligne et évitez les files d'attente. Service rapide, sécurisé et gratuit.",
  keywords: [
    "JigiFuel",
    "carburant Bamako",
    "station-service Mali",
    "réservation carburant",
    "essence Bamako",
    "diesel Mali",
    "ticket carburant",
    "station Total Bamako",
    "station Shell Mali",
    "éviter file d'attente carburant",
    "application carburant Mali",
    "Florynx Labs",
  ],
  authors: [{ name: "Florynx Labs SARL", url: "https://jigifuel.com" }],
  creator: "Florynx Labs SARL",
  publisher: "Florynx Labs SARL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  themeColor: "#FF7A00",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JigiFuel",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon-152x152.svg", sizes: "152x152", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_ML",
    url: "https://jigifuel.com",
    siteName: "JigiFuel",
    title: "JigiFuel - Réservation de Carburant à Bamako | Station-Service en Ligne",
    description: "Trouvez les stations-service à proximité et réservez votre ticket de carburant en ligne à Bamako. Évitez les files d'attente avec JigiFuel.",
    images: [
      {
        url: "/icon-512x512.svg",
        width: 512,
        height: 512,
        alt: "JigiFuel - Réservation de Carburant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JigiFuel - Réservation de Carburant à Bamako",
    description: "Trouvez les stations-service à proximité et réservez votre ticket de carburant en ligne. Évitez les files d'attente.",
    images: ["/icon-512x512.svg"],
    creator: "@florynxlabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://jigifuel.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" prefix="og: https://ogp.me/ns#">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "JigiFuel",
              "url": "https://jigifuel.com",
              "description": "Plateforme de réservation de carburant à Bamako, Mali",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "XOF"
              },
              "creator": {
                "@type": "Organization",
                "name": "Florynx Labs SARL",
                "url": "https://jigifuel.com",
                "logo": "https://jigifuel.com/icon-512x512.svg",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Bamako",
                  "addressCountry": "ML"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker enregistré avec succès:', registration.scope);
                    },
                    function(err) {
                      console.log('Échec de l\\'enregistrement du Service Worker:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1A1A1A',
              border: '1px solid #E0E0E0',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
