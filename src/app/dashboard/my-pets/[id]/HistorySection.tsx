"use client";

import { useState } from "react";
import { Plus, ClipboardList } from "lucide-react";
import { usePosts } from "@/lib/postsContext";
import type { MyPet } from "@/lib/postsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function HistorySection({ pet }: { pet: MyPet }) {
  const { addHistoryEvent } = usePosts();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ event: "", date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHistoryEvent(pet.id, form);
    setForm({ event: "", date: "" });
    setShowForm(false);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <ClipboardList className="h-5 w-5 text-[#4f9669]" />
          Үйл ажиллагаа
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
            <Label>Үйл ажиллагаа</Label>
            <Input
              value={form.event}
              onChange={(e) => setForm((f) => ({ ...f, event: e.target.value }))}
              placeholder="Эмнэлэгт очив"
              required
            />
          </div>
          <div>
            <Label>Огноо</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              required
            />
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
        {pet.history.length === 0 ? (
          <p className="text-sm text-gray-500">Үйл ажиллагаа бүртгээгүй байна</p>
        ) : (
          pet.history.map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
            >
              <p className="font-semibold">{h.event}</p>
              <p className="text-sm text-gray-500">{h.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
