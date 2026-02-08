"use client";

import Link from "next/link";
import { Syringe, ClipboardList } from "lucide-react";
import { usePosts } from "@/lib/postsContext";

export default function HistoryPage() {
  const { myPets } = usePosts();

  const allVaccines = myPets.flatMap((pet) =>
    pet.vaccines.map((v) => ({ ...v, petName: pet.name }))
  );
  const allHistory = myPets.flatMap((pet) =>
    pet.history.map((h) => ({ ...h, petName: pet.name }))
  );

  allVaccines.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  allHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Түүх</h1>
        <p className="text-gray-600">
          Амьтдын эмнэлгийн түүх, вакцин, үйл ажиллагаа
        </p>
      </div>

      {myPets.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-16 text-center">
          <p className="mb-2 text-gray-600">Одоогоор өгөгдөл байхгүй</p>
          <p className="mb-6 text-sm text-gray-500">
            Эхлээд &quot;Миний амьтад&quot; дээр амьтан нэмээд вакцин, үйл
            ажиллагаа бүртгэнэ үү?
          </p>
          <Link
            href="/dashboard/my-pets"
            className="inline-flex items-center gap-2 rounded-lg bg-[#4f9669] px-6 py-3 font-medium text-white hover:bg-[#458559]"
          >
            Миний амьтад руу орох
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Syringe className="h-5 w-5 text-[#4f9669]" />
              Вакцины түүх
            </h2>
            <div className="space-y-3">
              {allVaccines.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Вакцин бүртгээгүй. Миний амьтад дээр амьтан сонгож вакцин
                  нэмнэ үү.
                </p>
              ) : (
                allVaccines.map((record, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Syringe className="h-6 w-6 text-[#4f9669]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {record.vaccine}
                      </p>
                      <p className="text-sm text-gray-600">
                        {record.petName} · Хийгдсэн: {record.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Дараагийн хугацаа</p>
                      <p className="text-sm font-medium text-[#4f9669]">
                        {record.nextDue}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
              <ClipboardList className="h-5 w-5 text-[#4f9669]" />
              Үйл ажиллагаа
            </h2>
            <div className="space-y-3">
              {allHistory.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Үйл ажиллагаа бүртгээгүй. Миний амьтад дээр амьтан сонгож үйл
                  ажиллагаа нэмнэ үү.
                </p>
              ) : (
                allHistory.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4f9669]/10">
                      <ClipboardList className="h-6 w-6 text-[#4f9669]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600">{event.petName}</p>
                    </div>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
