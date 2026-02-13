'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

type Props = {
  center?: [number, number];
  zoom?: number;
  className?: string; // controls size from outside
};

export default function SimpleMapClient({ center = [47.9112, 106.9157], zoom = 12, className = 'h-full w-full' }: Props) {
  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom} className="h-full w-full rounded-xl">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
      </MapContainer>
    </div>
  );
}
