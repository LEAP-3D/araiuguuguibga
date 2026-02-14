'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  setLocation: (loc: string) => void;
  initial?: [number, number];
};

// Custom SVG Icon
const customIcon = new L.Icon({
  iconUrl: '/lostPet.svg', // your custom SVG path
  iconSize: [40, 40], // adjust size
  iconAnchor: [20, 40], // point at the bottom center
  popupAnchor: [0, -40], // where popup appears relative to marker
});

function ClickHandler({ onClick }: { onClick: (pos: LatLngLiteral) => void }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

export default function Map({ setLocation, initial = [47.9192, 106.917] }: Props) {
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // dynamically import Leaflet CSS on client
    import('leaflet/dist/leaflet.css').catch(() => {
      console.warn('Leaflet CSS failed to load');
    });
  }, []);
  function handleMapClick(latlng: LatLngLiteral) {
    setPosition(latlng);
    if (typeof setLocation === 'function') {
      setLocation(`${latlng.lat},${latlng.lng}`);
    } else {
      // defensive: caller didn't pass a function
      // eslint-disable-next-line no-console
      console.warn('AddPostMap: setLocation is not a function', setLocation);
    }
  }

  if (!mounted) {
    return <div className="w-full h-72 rounded-xl bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="w-full">
      <MapContainer center={initial} zoom={12} style={{ height: 300, width: '100%' }} className="rounded-xl">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <ClickHandler onClick={handleMapClick} />
        {position && <Marker position={[position.lat, position.lng]} icon={customIcon} />}
      </MapContainer>
    </div>
  );
}
