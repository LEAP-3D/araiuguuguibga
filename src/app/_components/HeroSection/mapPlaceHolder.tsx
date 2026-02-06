'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Veterinary } from '../types';
import MapResizeFix from '../HeroSection/MapResizeFix';

const userIcon = new L.Icon({
  iconUrl: '/map.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Leaflet default icon fix
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Props = {
  vets: Veterinary[];
  temporaryVet: Veterinary | null;
  userLocation: { lat: number; lng: number } | null;
  onTempChange?: (vet: Veterinary) => void;
  onCancelTemp: () => void;
};

export default function MapPlaceholder({ vets, userLocation, temporaryVet, onTempChange, onCancelTemp }: Props) {
  const [mounted, setMounted] = useState(false);

  // ✅ Only render map after client mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="h-[400px] w-full md:h-[600px] lg:h-[600px]">
      <MapContainer center={[47.9212, 106.9057]} zoom={12} style={{ height: '100%', width: '100%' }} className="rounded-xl">
        <MapResizeFix />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Таны байршил</Popup>
          </Marker>
        )}

        {temporaryVet && (
          <Marker position={[temporaryVet.lat, temporaryVet.lng]}>
            <Popup>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Эмнэлгийн нэр"
                  className="border p-1"
                  value={temporaryVet.name}
                  onChange={(e) =>
                    onTempChange?.({
                      ...temporaryVet,
                      name: e.target.value,
                    })
                  }
                />
                <button onClick={onCancelTemp} className="bg-red-500 text-white px-2 py-1 rounded text-xs mt-1">
                  Цуцлах
                </button>
              </div>
            </Popup>
          </Marker>
        )}

        {vets.map((vet) => (
          <Marker key={vet.id} position={[vet.lat, vet.lng]}>
            <Popup>
              <strong>{vet.name}</strong>
              <span className="block text-xs">{vet.address}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
