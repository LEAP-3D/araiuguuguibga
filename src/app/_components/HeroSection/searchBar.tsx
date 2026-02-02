import { Search } from "lucide-react";

type SearchBarProps = { query: string; onChange: (q: string) => void };
export function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Эмнэлэг хайх..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition-colors focus:border-[#4f9669] focus:outline-none focus:ring-2 focus:ring-[#4f9669]/20"
      />
    </div>
  );
}
