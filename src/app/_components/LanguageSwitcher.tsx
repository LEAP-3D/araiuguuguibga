export function LanguageSwitcher() {
  return (
    <div className="flex items-center bg-orange-100 rounded-full p-1 shadow-inner">
      <button className="px-3 py-1 text-sm font-semibold rounded-full bg-linear-to-r from-orange-400 to-amber-400 text-white shadow">
        EN
      </button>
      <button className="px-3 py-1 text-sm font-semibold rounded-full text-orange-700">
        MGL
      </button>
    </div>
  );
}
