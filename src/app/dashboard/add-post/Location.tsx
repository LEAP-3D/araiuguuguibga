'use client';

import AddPostMap from '@/app/_components/HeroSection/add-post-map';
import { MapPin } from 'lucide-react';

type LocationProps = {
  location: string;
  setLocation: (loc: string) => void;
};
type PostForm = {
  petName: string;
  breed: string;
  age: string;
  type: 'dog' | 'cat' | 'other';
  description: string;
  location: string;
  imagePreviews: string[];
};

export default function Location({ form, setForm }: LocationProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 items-center w-full max-w-xl">
        <div className="text-3xl">
          <MapPin className="w-12 h-12" />
        </div>
        <div className="text-center">
          <p className="font-semibold">Pick Location on Map</p>
          <p className="text-sm text-gray-500">Click on the map to drop a pin where the animal was seen</p>
        </div>

        {/* Pass setLocation so AddPostMap can update state */}
        <AddPostMap
          setLocation={(loc: string) =>
            setForm((prev: PostForm) => ({
              ...prev,
              location: loc,
            }))
          }
        />
      </div>
    </div>
  );
}
