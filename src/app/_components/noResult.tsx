import { MapPin } from "lucide-react";

export function NoResults() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
      {" "}
      <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-300" />{" "}
      <p className="font-medium text-gray-600">Эмнэлэг олдсонгүй</p>
      <p className="text-sm text-gray-500">Хайлтаа өөрчилж үзнэ үү</p>
    </div>
  );
}
