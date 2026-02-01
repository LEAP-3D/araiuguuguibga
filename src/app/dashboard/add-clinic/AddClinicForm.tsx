"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { useClinics } from "@/lib/clinicsContext";
import { Button } from "@/components/ui/button";
import { ClinicFormFields } from "./ClinicFormFields";

export function AddClinicForm() {
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
      services: form.services.split(",").map((s) => s.trim()).filter(Boolean),
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
        <p className="mt-1 text-gray-600">Зөвхөн админ эмнэлгийн мэдээлэл нэмж оруулна</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <ClinicFormFields form={form} setForm={setForm} />
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#4f9669] hover:bg-[#458559]"
          >
            {isSubmitting ? "Боловсруулж байна..." : "Нэмэх"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/#vets")}>
            Цуцлах
          </Button>
        </div>
      </form>
    </div>
  );
}
