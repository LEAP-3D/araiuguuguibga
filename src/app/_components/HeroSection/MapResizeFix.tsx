'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Leaflet map fully render хийгдсэний дараа invalidateSize
    const raf = requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => cancelAnimationFrame(raf);
  }, [map]);

  return null;
}
