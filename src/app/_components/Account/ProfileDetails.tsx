"use client";

import { UploadImage } from "./UploadImage";
import { X } from "lucide-react";

export default function ProfileDetails() {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-150 bg-[#FFFDF8] rounded-3xl shadow-2xl border border-[#f1e6d9] p-9 relative">
        {/* Close Button */}
        <button className="absolute right-6 top-6 text-neutral-500 hover:text-black transition">
          <X size={22} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">🐾</span>
          <h2 className="text-3xl font-semibold text-[#3b2f2f]">
            Owner Details
          </h2>
        </div>

        <div className="mb-2">
          <label className="block text-lg font-medium text-[#3b2f2f] mb-2">
            User Name *
          </label>
          <input
            placeholder="e.g., Ujin Munkhjargal"
            className="w-full px-5 py-2 rounded-2xl border-2 border-[#4b8662] outline-none focus:ring-2 focus:ring-[#4b8662]/40 text-lg bg-[#fffaf3]"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-2">
          <div>
            <label className="block text-lg font-medium text-[#3b2f2f] mb-2">
              Email *
            </label>
            <input
              placeholder="e.g., ujinm23@gmail.com"
              className="w-full px-5 py-2 rounded-2xl border-2 border-[#4b8662] outline-none focus:ring-2 focus:ring-[#4b8662]/40 text-lg bg-[#fffaf3]"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-[#3b2f2f] mb-2">
              Phone Number *
            </label>
            <input
              placeholder="e.g., 99999999"
              className="w-full px-5 py-2 rounded-2xl border border-[#eadfd2] bg-[#fffaf3] text-lg outline-none"
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-lg font-medium text-[#3b2f2f] mb-2">
            Address *
          </label>
          <input
            placeholder="e.g.,19 khoroo, HUD district, Ulaanbaatar, "
            className="w-full px-5 py-2 rounded-2xl border border-[#eadfd2] bg-[#fffaf3] text-lg"
          />
        </div>

        {/* Photo URL */}
        <div className="mb-20">
          <label className="block text-lg font-medium text-[#3b2f2f] mb-2">
            Photo (optional)
          </label>
          <UploadImage />
        </div>
      </div>
    </div>
  );
}
