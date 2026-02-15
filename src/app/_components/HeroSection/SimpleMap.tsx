'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const SimpleMapClient = dynamic(() => import('./SimpleMap.client'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center">Loading map...</div>,
});

type Props = {
  center?: [number, number];
  zoom?: number;
  className?: string;
  onSelect?: (location: { lat: number; lng: number }) => void;
};

export default function SimpleMap(props: Props) {
  return <SimpleMapClient {...props} />;
}
