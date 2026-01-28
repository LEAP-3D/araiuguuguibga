export default function LanguageSwitcher() {
  return (
    <div className="flex items-center bg-gray-100 rounded-full p-0.5 shadow-sm">
      <button className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#f06e42] text-white shadow-sm">
        EN
      </button>
      <button className="px-2 py-0.5 text-xs font-medium rounded-full text-[#f06e42] hover:bg-gray-50 transition-colors">
        MGL
      </button>
    </div>
  );
}
