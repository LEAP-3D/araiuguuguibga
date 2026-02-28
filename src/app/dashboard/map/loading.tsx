import { CuteSleepingCatLoader } from '@/app/_components/loading/CuteSleepingCatLoader';

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-64 w-64">
        <CuteSleepingCatLoader />
      </div>
    </div>
  );
}
