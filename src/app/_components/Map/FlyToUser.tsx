'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type Props = {
  location: [number, number] | null;
};

export default function FlyToUser({ location }: Props) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo(location, 15);
  }, [location, map]);
  return null;
}
