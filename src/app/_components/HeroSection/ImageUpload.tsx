'use client';

type ImageUploadProps = {
  image: string | null;
  loading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  onAnalyze: () => void;
};

export const ImageUpload = ({ image, loading, onImageChange, onRemove, onAnalyze }: ImageUploadProps) => (
  <div className="flex-1 w-full flex flex-col items-center" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
    <div className="relative w-full rounded-[32px] overflow-hidden bg-gray-50 min-h-80 border-2 border-dashed border-gray-300">
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Pet" className="w-full max-h-[500px] object-contain block" />
          <button onClick={onRemove} className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full z-10">
            ✕
          </button>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center h-80 cursor-pointer">
          <span className="text-3xl mb-2">📷</span>
          <p className="font-bold text-gray-400 text-xs uppercase">Зураг оруулах</p>
          <input type="file" className="hidden" onChange={onImageChange} accept="image/*" />
        </label>
      )}
    </div>
    <button
      onClick={onAnalyze}
      disabled={!image || loading}
      className={`mt-8 w-full md:w-64 py-3 rounded-2xl font-black text-sm tracking-widest transition-all ${
        !image || loading ? 'bg-gray-100 text-gray-400' : 'bg-[#fba925] text-white shadow-xl hover:bg-orange-400'
      }`}
    >
      {loading ? 'Шинжилж байна...' : 'Шинжилгээг эхлүүлэх'}
    </button>
  </div>
);
