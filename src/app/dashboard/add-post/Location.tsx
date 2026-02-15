import SimpleMap from '@/app/_components/HeroSection/SimpleMap';

export type LocationType = {
  lat: number;
  lng: number;
};

type LostPetForm = {
  // contact
  contactName: string;
  contactPhone: string;
  contactNotes: string;

  // details
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  size: 'small' | 'medium' | 'large' | 'extra-large';
  petName: string;
  breed: string;
  age: string;
  color: string;
  description: string;

  // location
  location: LocationType | null;
};

type Props = {
  form: LostPetForm;
  setForm: React.Dispatch<React.SetStateAction<LostPetForm>>;
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
