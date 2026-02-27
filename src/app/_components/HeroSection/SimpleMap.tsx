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
  return <div className="w-full flex justify-center">
  <div className="w-full max-w-[520px] md:max-w-full overflow-hidden rounded-xl border border-amber-100">
<SimpleMapClient {...props} />
</div>
</div>;
}
