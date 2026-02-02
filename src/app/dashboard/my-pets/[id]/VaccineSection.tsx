"use client";

import { useState } from "react";
import { Plus, Syringe } from "lucide-react";
import { usePosts } from "@/lib/postsContext";
import type { MyPet } from "@/lib/postsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VaccineSection({ pet }: { pet: MyPet }) {
  const { addVaccine } = usePosts();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ vaccine: "", date: "", nextDue: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVaccine(pet.id, form);
    setForm({ vaccine: "", date: "", nextDue: "" });
    setShowForm(false);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Syringe className="h-5 w-5 text-[#4f9669]" />
          Вакцины түүх
        </h2>
        <Button
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4f9669] hover:bg-[#458559]"
        >
          <Plus className="h-4 w-4" /> Нэмэх
        </Button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
        >
          <div>
            <Label>Вакцины нэр</Label>
            <Input
              value={form.vaccine}
              onChange={(e) => setForm((f) => ({ ...f, vaccine: e.target.value }))}
              placeholder="Rabies Vaccine"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Хийгдсэн огноо</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label>Дараагийн хугацаа</Label>
              <Input
                type="date"
                value={form.nextDue}
                onChange={(e) => setForm((f) => ({ ...f, nextDue: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" className="bg-[#4f9669] hover:bg-[#458559]">
              Хадгалах
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
              Цуцлах
            </Button>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {pet.vaccines.length === 0 ? (
          <p className="text-sm text-gray-500">Вакцин бүртгээгүй байна</p>
        ) : (
          pet.vaccines.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
            >
              <div>
                <p className="font-semibold">{v.vaccine}</p>
                <p className="text-sm text-gray-600">Хийгдсэн: {v.date}</p>
              </div>
              <p className="text-sm font-medium text-[#4f9669]">{v.nextDue}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
