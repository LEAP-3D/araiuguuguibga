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
          <p className="font-semibold">байршил сонгох</p>
          <p className="text-sm text-gray-500">Газрын зураг дээр дарж тэмдэг тавина уу</p>

          {form.location && <p className="text-xs text-green-600 mt-2">✓ Байршил сонгогдсон</p>}
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
