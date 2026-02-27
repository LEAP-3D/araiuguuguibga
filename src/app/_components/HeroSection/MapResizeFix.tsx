'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const resize = () => {
      map.invalidateSize();
    };

    // run immediately
    resize();

    // run again after layout settles
    const t1 = setTimeout(resize, 100);
    const t2 = setTimeout(resize, 300);

    // run on window resize
    window.addEventListener('resize', resize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', resize);
    };
  }, [map]);

  return null;
}