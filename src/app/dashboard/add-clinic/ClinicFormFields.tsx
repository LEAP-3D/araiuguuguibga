"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CATEGORIES = [
  { value: "emneleg", label: "Эмнэлэг" },
  { value: "klinik", label: "Клиник" },
  { value: "yaaraltai", label: "Яаралтай" },
  { value: "emiin_san", label: "Эмийн сан" },
] as const;

type FormState = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: string;
  isOpen: boolean;
  emergency: boolean;
  category: "emneleg" | "klinik" | "yaaraltai" | "emiin_san";
  services: string;
};

type ClinicFormFieldsProps = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};

export function ClinicFormFields({ form, setForm }: ClinicFormFieldsProps) {
  return (
    <>
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
              onClick={() => setForm((f) => ({ ...f, category: c.value }))}
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
          onChange={(e) => setForm((f) => ({ ...f, services: e.target.value }))}
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
            onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
            className="mt-1 h-11"
          />
        </div>
        <div className="space-y-3 pt-8">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.isOpen}
              onChange={(e) => setForm((f) => ({ ...f, isOpen: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Нээлттэй</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.emergency}
              onChange={(e) => setForm((f) => ({ ...f, emergency: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Яаралтай тусламж</span>
          </label>
        </div>
      </div>
    </>
  );
}
