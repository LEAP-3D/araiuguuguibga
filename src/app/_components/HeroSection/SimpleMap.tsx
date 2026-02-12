'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const SimpleMapClient = dynamic(() => import('./SimpleMap.client'), {
  ssr: false,
  // Minimal loader while the map bundle is being loaded on client
  loading: () => <div className="h-200 w-300" />,
});

type Props = {
  center?: [number, number];
  zoom?: number;
  className?: string;
};

export default function SimpleMap(props: Props) {
  return <SimpleMapClient {...props} />;
}
