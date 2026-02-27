'use client';

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import L from 'leaflet';

const lostPetIcon = L.icon({
  iconUrl: '/PawPinRed.svg',
  iconSize: [30, 41], // same as default marker
  iconAnchor: [12, 41], // bottom center (IMPORTANT)
  popupAnchor: [1, -34], // popup position
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

type Props = {
  center?: [number, number];
  zoom?: number;
  className?: string;
  onSelect?: (location: { lat: number; lng: number }) => void;
};
function UserLocation({ setUserLocation }: { setUserLocation: (loc: [number, number]) => void }) {
  const map = useMapEvents({});

  React.useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latlng: [number, number] = [position.coords.latitude, position.coords.longitude];

        setUserLocation(latlng);

        // move map to user
        map.setView(latlng, 15);
      },
      (err) => {
        console.log('Location error:', err);
      }
    );
  }, [map, setUserLocation]);

  return null;
}
function LocationMarker({ onSelect }: { onSelect?: (location: { lat: number; lng: number }) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onSelect) {
        onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });

  return position === null ? null : <Marker position={position} icon={lostPetIcon} />;
}
function FixMapResize() {
  const map = useMap();
  React.useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 80);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

export default function SimpleMapClient({ center = [47.9112, 106.9157], zoom = 12, className = 'w-full h-[260px] sm:h-[320px] md:h-[420px]', onSelect }: Props) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <FixMapResize/>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

        {/* Get user location */}
        <UserLocation setUserLocation={setUserLocation} />

        {/* Show user's location */}
        {userLocation && <Marker position={userLocation}>{/* optional popup */}</Marker>}

        {/* Your clickable marker */}
        <LocationMarker onSelect={onSelect} />
      </MapContainer>
    </div>
  );
}
