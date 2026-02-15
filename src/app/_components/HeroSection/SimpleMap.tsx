'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { CuteSleepingCatLoader } from '../loading/CuteSleepingCatLoader';

const SimpleMapClient = dynamic(() => import('./SimpleMap.client'), {
  ssr: false,
  loading: () => <CuteSleepingCatLoader />,
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
