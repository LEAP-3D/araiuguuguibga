import SimpleMap from '@/app/_components/HeroSection/SimpleMap';
import type { FormState } from './AddPostForm';

type Props = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};

export default function Location({ form, setForm }: Props) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 items-center w-full max-w-xl">
        <div className="text-center">
          <p className="font-semibold">Pick Location on Map</p>
          <p className="text-sm text-gray-500">Click on the map to drop a pin</p>
          {form.location && <p className="text-xs text-green-600 mt-2">✓ Location selected</p>}
        </div>

        <SimpleMap
          zoom={13}
          className="w-130 h-70 rounded-xl"
          onSelect={(latlng) => {
            setForm((prev) => ({
              ...prev,
              location: latlng,
            }));
          }}
        />
      </div>
    </div>
  );
}
