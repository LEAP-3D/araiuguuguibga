import dynamic from 'next/dynamic';
import { CuteSleepingCatLoader } from '../loading/CuteSleepingCatLoader';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <CuteSleepingCatLoader />,
});

export default LeafletMap;
