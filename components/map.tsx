'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Button } from './ui/button';
import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const greenIcon = createCustomIcon('#10B981');
const redIcon = createCustomIcon('#EF4444');

interface Station {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  status: string;
  address?: string;
}

interface MapProps {
  stations: Station[];
  onReserveTicket: (stationId: string) => void;
  onStartNavigation?: (station: Station) => void;
}

export default function Map({ stations, onReserveTicket, onStartNavigation }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    );
  }

  // Center on Bamako, Mali
  const center: [number, number] = [12.6392, -8.0029];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={true}
      doubleClickZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={station.status === 'open' ? greenIcon : redIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg text-[#1A1A1A]">{station.name}</h3>
              <p className="text-sm text-[#6B7280] mb-1">Code: {station.code}</p>
              {station.address && (
                <p className="text-sm text-[#6B7280] mb-2">{station.address}</p>
              )}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    station.status === 'open' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-medium">
                  {station.status === 'open' ? 'Ouvert' : 'Fermé'}
                </span>
              </div>
              <div className="space-y-2">
                {station.status === 'open' ? (
                  <Button
                    onClick={() => onReserveTicket(station.id)}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Réserver un ticket
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" className="w-full" disabled>
                    Station fermée
                  </Button>
                )}
                {onStartNavigation && (
                  <Button
                    onClick={() => onStartNavigation(station)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    🧭 Démarrer le trajet
                  </Button>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
