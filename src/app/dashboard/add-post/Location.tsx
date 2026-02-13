import SimpleMap from '@/app/_components/HeroSection/SimpleMap';
import { MapPin } from 'lucide-react';

export default function Location() {
  return (
    <div className="justify-center flex">
      <div className="flex flex-col gap-4 items-center">
        <MapPin />
        <div className="text-center">
          <p>Pick Location on Map</p>
          <p>Click on the map to drop a pin where the animal was seen</p>
        </div>
        <SimpleMap zoom={13} className="w-130 h-70 " />
      </div>
    </div>
  );
}
