"use client";

import { MessageCircle, Heart } from "lucide-react";
import type { Stats } from "./petCard";

const stats: Stats[] = [
  { value: "2,500+", label: "Pets Adopted", icon: "🏠" },
  { value: "150+", label: "Partner Vets", icon: "⚕️" },
  { value: "24/7", label: "AI Support", icon: "🤖" },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden ">
      <div className="container px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Content */}
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
                Caring for every paw
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Give Them a<br />
              <span className="text-orange-500">Second Chance</span>
              <br />
              at Love
            </h1>

            {/* Description */}
            <p className="max-w-xl text-lg text-gray-600">
              Connect with rescue pets waiting for their forever homes. Find
              trusted vets nearby and get instant AI-powered pet care advice.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg">
                <MessageCircle className="h-5 w-5" />
                Ask AI Assistant
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Heart className="h-5 w-5" />
                Meet Our Pets
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

          {/* Hero Image with Pet */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 via-pink-100 to-orange-50 p-12">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl"></div>
              </div>

              {/* Pet Image */}
              <div className="relative flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-6 animate-bounce text-[200px] leading-none">
                    🐕
                  </div>
                  <div className="rounded-full bg-white/60 px-6 py-2 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-gray-700">
                      Looking for a home
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Pet Card - Top Right */}
            <div className="absolute -right-6 top-12 animate-slide-in-right rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-gray-100 md:-right-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-pink-100 text-2xl">
                  🐕
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Luna</p>
                  <p className="text-xs text-gray-500">Persian Cat</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5">
                <svg
                  className="h-3.5 w-3.5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium text-green-700">
                  150+ Vets Nearby
                </span>
              </div>
            </div>

            {/* Floating Pet Card - Bottom Left */}
            <div className="absolute -left-6 bottom-12 hidden rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-gray-100 md:block">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-pink-100 text-xl">
                  🐱
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Coco</p>
                  <p className="text-[10px] text-gray-500">Holland Lop</p>
                </div>
              </div>
            </div>

            {/* Decorative Paw Prints */}
            <div className="absolute right-1/4 top-0 -translate-y-1/2 text-4xl opacity-20">
              🐾
            </div>
            <div className="absolute bottom-0 left-1/4 translate-y-1/2 text-3xl opacity-20">
              🐾
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
