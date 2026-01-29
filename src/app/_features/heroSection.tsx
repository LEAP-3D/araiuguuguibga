"use client";

import { MessageCircle, Heart } from "lucide-react";
import { HeroPetProfile } from "./heroPetProfile";
import type { Stats } from "../_components/types";

const stats: Stats[] = [
  { value: "100+", label: "Хэрэглэгч", icon: "🏠" },
  { value: "15+", label: "Мал эмнэлэг", icon: "⚕️" },
  { value: "24/7", label: "AI Support", icon: "🤖" },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden flex justify-center">
      <div className="container px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* ===== ЗҮҮН ТАЛ ===== */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-3 py-1.5 shadow-sm">
              <svg
                className="h-4 w-4 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Өхөөрдөм савар бүрийн төлөө
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Азтай савруудын
              <br />
              <span className="text-orange-300">Нэгдсэн цогц</span>
              <br />
              Үйлчилгээ
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-2 cursor-pointer rounded-lg px-6 py-3 font-medium bg-linear-to-r from-orange-400 to-amber-400 hover:opacity-90 text-white shadow-md transition-all hover:shadow-lg">
                <MessageCircle className="h-5 w-5" />
                AI туслах
              </button>
              <button className="flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Heart className="h-5 w-5" />
                Мэдээлэл авах
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-orange-500">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== БАРУУН ТАЛ ===== */}
          <HeroPetProfile />
        </div>
      </div>
    </section>
  );
}
