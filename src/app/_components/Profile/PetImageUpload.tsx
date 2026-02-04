import { Upload, X } from 'lucide-react';

type Props = {
  image: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

export function PetImageUpload({ image, onImageChange, onRemove }: Props) {
  return image ? (
    <div className="relative rounded-lg border border-gray-200 bg-gray-50">
      <button type="button" onClick={onRemove} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white">
        <X className="h-4 w-4" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element -- dynamic data URL preview */}
      <img src={image || ''} alt="Preview" className="rounded-lg object-contain" />
    </div>
  ) : (
    <div className="w-25 h-25 pt-3 rounded-xl border-2 border-dashed border-[#48805b] hover:bg-[#58b97a2c]">
      <label className="flex flex-col cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-500">
        <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
        <Upload className="h-8 w-8 text-[#2b6440]" />
        <p className="text-[9px]">Зураг оруулах</p>
      </label>
    </div>
  );
}
