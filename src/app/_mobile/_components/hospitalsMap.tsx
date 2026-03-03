'use client';

import dynamic from 'next/dynamic';
import { CuteSleepingCatLoader } from '@/app/_components/loading/CuteSleepingCatLoader';

const HospitalsMapClient = dynamic(() => import('./hospitalsMap.client'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
      <div className="h-20 w-20">
        <CuteSleepingCatLoader />
      </div>
    </div>
  ),
});

export default function HospitalsMap({ className }: { className?: string }) {
  return <HospitalsMapClient className={className} />;
}
