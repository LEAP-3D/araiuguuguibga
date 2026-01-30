export function UploadImage() {
  return (
    <div className="w-full px-5 py-2 rounded-2xl border border-[#eadfd2] bg-[#fffaf3] text-lg">
      <input type="file" accept="image/*" className="w-full" />
    </div>
  );
}
