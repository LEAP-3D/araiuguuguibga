'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

type Props = {
  center?: [number, number];
  zoom?: number;
  className?: string;
};

export default function SimpleMapClient({ center = [47.9212, 106.9057], zoom = 12, className = 'h-full w-full rounded-xl' }: Props) {
  return (
    <div className="h-200 w-300">
      <MapContainer center={center} zoom={zoom} className={className}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      </MapContainer>
    </div>
  );
}
