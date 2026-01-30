export default function LanguageSwitcher() {
  return (
    <div className="flex items-center bg-green-50 rounded-full p-0.5 shadow-sm">
      <button className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#76b06d] text-white shadow-sm">
        EN
      </button>
      <button className="px-2 py-0.5 text-xs font-medium rounded-full text-black hover:bg-gray-50 transition-colors ">
        MGL
      </button>
    </div>
  );
}
