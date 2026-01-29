import { MapPin } from "lucide-react";

export function NoResults() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
      {" "}
      <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-300" />{" "}
      <p className="font-medium text-gray-600">No veterinarians found</p>{" "}
      <p className="text-sm text-gray-500">Try adjusting your search</p>{" "}
    </div>
  );
}
