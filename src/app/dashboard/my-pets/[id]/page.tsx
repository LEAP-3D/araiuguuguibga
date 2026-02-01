"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, PawPrint, Syringe, ClipboardList } from "lucide-react";
import { usePosts } from "@/lib/postsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { myPets, addVaccine, addHistoryEvent } = usePosts();
  const pet = myPets.find((p) => p.id === params.id);

  const [showVaccineForm, setShowVaccineForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [vaccineForm, setVaccineForm] = useState({
    vaccine: "",
    date: "",
    nextDue: "",
  });
  const [eventForm, setEventForm] = useState({ event: "", date: "" });

  if (!pet) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="mb-4 text-gray-600">Амьтан олдсонгүй</p>
        <Link
          href="/dashboard/my-pets"
          className="text-[#4f9669] hover:underline"
        >
          ← Миний амьтад руу буцах
        </Link>
      </div>
    );
  }

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    addVaccine(pet.id, vaccineForm);
    setVaccineForm({ vaccine: "", date: "", nextDue: "" });
    setShowVaccineForm(false);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addHistoryEvent(pet.id, eventForm);
    setEventForm({ event: "", date: "" });
    setShowEventForm(false);
  };

  const imageDisplay =
    pet.image.startsWith("http") ||
    pet.image.startsWith("/") ||
    pet.image.startsWith("data:") ? (
      <img
        src={pet.image}
        alt={pet.name}
        className="h-48 w-48 rounded-2xl object-cover"
      />
    ) : (
      <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-gray-100">
        <PawPrint className="h-16 w-16 text-gray-400" />
      </div>
    );

  return (
    <div>
      <Link
        href="/dashboard/my-pets"
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Буцах
      </Link>

      <div className="mb-8 flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gray-50">
          {imageDisplay}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
          <p className="text-gray-600">{pet.breed}</p>
          {pet.age && <p className="text-sm text-gray-500">{pet.age}</p>}
        </div>
      </div>

      <div className="space-y-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Syringe className="h-5 w-5 text-[#4f9669]" />
              Вакцины түүх
            </h2>
            <Button
              size="sm"
              onClick={() => setShowVaccineForm(!showVaccineForm)}
              className="bg-[#4f9669] hover:bg-[#458559]"
            >
              <Plus className="h-4 w-4" /> Нэмэх
            </Button>
          </div>
          {showVaccineForm && (
            <form
              onSubmit={handleAddVaccine}
              className="mb-4 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
            >
              <div>
                <Label>Вакцины нэр</Label>
                <Input
                  value={vaccineForm.vaccine}
                  onChange={(e) =>
                    setVaccineForm((f) => ({ ...f, vaccine: e.target.value }))
                  }
                  placeholder="Rabies Vaccine"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Хийгдсэн огноо</Label>
                  <Input
                    type="date"
                    value={vaccineForm.date}
                    onChange={(e) =>
                      setVaccineForm((f) => ({ ...f, date: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Дараагийн хугацаа</Label>
                  <Input
                    type="date"
                    value={vaccineForm.nextDue}
                    onChange={(e) =>
                      setVaccineForm((f) => ({ ...f, nextDue: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" size="sm" className="bg-[#4f9669] hover:bg-[#458559]">
                  Хадгалах
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVaccineForm(false)}
                >
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
                  <p className="text-sm font-medium text-[#4f9669]">
                    {v.nextDue}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#4f9669]" />
              Үйл ажиллагаа
            </h2>
            <Button
              size="sm"
              onClick={() => setShowEventForm(!showEventForm)}
              className="bg-[#4f9669] hover:bg-[#458559]"
            >
              <Plus className="h-4 w-4" /> Нэмэх
            </Button>
          </div>
          {showEventForm && (
            <form
              onSubmit={handleAddEvent}
              className="mb-4 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
            >
              <div>
                <Label>Үйл ажиллагаа</Label>
                <Input
                  value={eventForm.event}
                  onChange={(e) =>
                    setEventForm((f) => ({ ...f, event: e.target.value }))
                  }
                  placeholder="Эмнэлэгт очив"
                  required
                />
              </div>
              <div>
                <Label>Огноо</Label>
                <Input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) =>
                    setEventForm((f) => ({ ...f, date: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" size="sm" className="bg-[#4f9669] hover:bg-[#458559]">
                  Хадгалах
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEventForm(false)}
                >
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
      </div>
    </div>
  );
}
