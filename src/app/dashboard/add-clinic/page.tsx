"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { useClinics } from "@/lib/clinicsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CATEGORIES = [
  { value: "emneleg", label: "Эмнэлэг" },
  { value: "klinik", label: "Клиник" },
  { value: "yaaraltai", label: "Яаралтай" },
  { value: "emiin_san", label: "Эмийн сан" },
] as const;

export default function AddClinicPage() {
  const router = useRouter();
  const { addClinic } = useClinics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    hours: "",
    rating: "4.5",
    isOpen: true,
    emergency: false,
    category: "emneleg" as "emneleg" | "klinik" | "yaaraltai" | "emiin_san",
    services: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    addClinic({
      name: form.name.trim(),
      address: form.address.trim(),
      phone: form.phone.trim(),
      hours: form.hours.trim() || undefined,
      rating: parseFloat(form.rating) || 4.5,
      isOpen: form.isOpen,
      emergency: form.emergency,
      category: form.category,
      services: form.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      coordinates: { lat: 47.9212, lng: 106.9057 },
    });
    setIsSubmitting(false);
    router.push("/#vets");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/#vets"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Буцах
      </Link>

      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Building2 className="h-7 w-7 text-[#4f9669]" />
          Эмнэлэг нэмэх (Админ)
        </h1>
        <p className="mt-1 text-gray-600">
          Зөвхөн админ эмнэлгийн мэдээлэл нэмж оруулна
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <Label htmlFor="name">Эмнэлгийн нэр *</Label>
          <Input
            id="name"
            placeholder="Жишээ: Улсын Нэгдүгээр Төв Эмнэлэг"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="mt-1 h-11"
          />
        </div>

        <div>
          <Label htmlFor="address">Хаяг *</Label>
          <Input
            id="address"
            placeholder="Жишээ: Сүхбаатар дүүрэг, 1-р хороо"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            required
            className="mt-1 h-11"
          />
        </div>

        <div>
          <Label htmlFor="phone">Утас *</Label>
          <Input
            id="phone"
            placeholder="Жишээ: +976 11 311515"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            required
            className="mt-1 h-11"
          />
        </div>

        <div>
          <Label htmlFor="hours">Ажиллах цаг</Label>
          <Input
            id="hours"
            placeholder="Жишээ: 08:00 - 18:00 эсвэл 24 цаг"
            value={form.hours}
            onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))}
            className="mt-1 h-11"
          />
        </div>

        <div>
          <Label>Төрөл</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() =>
                  setForm((f) => ({ ...f, category: c.value }))
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  form.category === c.value
                    ? "bg-[#4f9669] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="services">Үйлчилгээ (таслалаар тусгаарлана)</Label>
          <Input
            id="services"
            placeholder="Яаралтай тусламж, Мэс засал, Оношилгоо"
            value={form.services}
            onChange={(e) =>
              setForm((f) => ({ ...f, services: e.target.value }))
            }
            className="mt-1 h-11"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="rating">Үнэлгээ</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) =>
                setForm((f) => ({ ...f, rating: e.target.value }))
              }
              className="mt-1 h-11"
            />
          </div>
          <div className="space-y-3 pt-8">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.isOpen}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isOpen: e.target.checked }))
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">Нээлттэй</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={form.emergency}
                onChange={(e) =>
                  setForm((f) => ({ ...f, emergency: e.target.checked }))
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm">Яаралтай тусламж</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#4f9669] hover:bg-[#458559]"
          >
            {isSubmitting ? "Боловсруулж байна..." : "Нэмэх"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/#vets")}
          >
            Цуцлах
          </Button>
        </div>
      </form>
    </div>
  );
}
