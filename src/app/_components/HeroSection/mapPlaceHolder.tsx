'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Veterinary } from '../types';
import MapResizeFix from '../HeroSection/MapResizeFix';

const userIcon = new L.Icon({
  iconUrl: '/map.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Props = {
  vets: Veterinary[];
  selectedVet: Veterinary | null;
  onSelect: (vet: Veterinary) => void;
  temporaryVet: Veterinary | null;
  userLocation: { lat: number; lng: number } | null;
  onMapClick: (lat: number, lng: number) => void;
  onTempChange?: (vet: Veterinary) => void;
  onCancelTemp: () => void;
  onSaveTemp?: (vet: Veterinary) => void;
  radius: number;
  setUserLocation?: (loc: { lat: number; lng: number }) => void;
};

// function OnMapClickHandler({ handleClick }: { handleClick: (lat: number, lng: number) => void }) {
//   useMapEvents({
//     click(e) {
//       handleClick(e.latlng.lat, e.latlng.lng);
//     },
//   });
//   return null;
// }

function FlyToSelectedVet({ vet }: { vet: Veterinary | null }) {
  const map = useMap();
  useEffect(() => {
    if (!vet) return;
    map.flyTo([vet.lat, vet.lng], 15, {
      animate: true,
      duration: 0.8,
    });
  }, [vet, map]);
  return null;
}

export default function MapPlaceholder({
  vets,
  selectedVet,
  onSelect,
  temporaryVet,
  userLocation,
  onMapClick,
  onTempChange,
  onCancelTemp,

  radius,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-100 w-full md:h-150 lg:h-150 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <span className="text-gray-400">Газрын зураг ачаалж байна...</span>
      </div>
    );
  }

  return (
    <div className="h-100 w-full md:h-150 lg:h-200 relative group">
      <MapContainer center={[47.9212, 106.9057]} scrollWheelZoom={true} zoom={12} whenReady={() => setMapReady(true)} style={{ height: '100%', width: '100%' }} className="rounded-xl z-0">
        {mapReady && (
          <>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />

            <MapResizeFix />
            <FlyToSelectedVet vet={selectedVet} />
            {/* <OnMapClickHandler handleClick={onMapClick} /> */}

            {userLocation && userIcon && (
              <>
                <Circle center={[userLocation.lat, userLocation.lng]} radius={radius} pathOptions={{ fillColor: '#3b82f6', fillOpacity: 0.15, color: '#3b82f6', weight: 1, dashArray: '5, 10' }} />
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                  <Popup>Та энд байна</Popup>
                </Marker>
              </>
            )}

            {temporaryVet && (
              <Marker position={[temporaryVet.lat, temporaryVet.lng]}>
                <Popup autoPan>
                  <div className="flex flex-col gap-2 p-1 text-black">
                    <strong className="text-xs">Шинэ байршил</strong>
                    <input
                      type="text"
                      placeholder="Эмнэлгийн нэр"
                      className="border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-green-500 text-black"
                      value={temporaryVet.name}
                      onChange={(e) =>
                        onTempChange?.({
                          ...temporaryVet,
                          name: e.target.value,
                        })
                      }
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button type="button" onClick={onCancelTemp} className="flex-1 bg-red-500 text-white px-2 py-1 rounded text-[10px]">
                        Цуцлах
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}

            {vets.map((vet) => (
              <Marker
                key={vet.id}
                position={[vet.lat, vet.lng]}
                eventHandlers={{
                  click: () => onSelect(vet),
                }}
              >
                <Popup>
                  <div className="p-1 text-black">
                    <strong className="block text-sm">{vet.name}</strong>
                    <span className="text-xs text-gray-600">{vet.address}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
      {!userLocation && (
        <div className="absolute bottom-6 right-6 z-1000">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl p-4 rounded-2xl max-w-45 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <p className="text-[11px] font-bold  leading-tight text-black">Өөрт ойр эмнэлэг харах бол location-оо асаана уу.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
