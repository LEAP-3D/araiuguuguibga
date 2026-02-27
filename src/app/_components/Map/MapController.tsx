'use client';

import type L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Props = {
  mapRef: React.MutableRefObject<L.Map | null>;
};

export default function MapController({ mapRef }: Props) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}
