"use client";

import { Input } from "@/components/ui/input";

const PET_TYPES = [
  { value: "dog", label: "Нохой" },
  { value: "cat", label: "Муур" },
  { value: "other", label: "Бусад" },
] as const;

type FormSubset = {
  petName: string;
  breed: string;
  age: string;
  type: "dog" | "cat" | "other";
};

type AddPostExtraFieldsProps<T extends FormSubset> = {
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
};

export function AddPostExtraFields<T extends FormSubset>({
  form,
  setForm,
}: AddPostExtraFieldsProps<T>) {
  return (
    <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Амьтны төрөл</label>
          <div className="flex gap-1">
            {PET_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: t.value }))}
                className={`flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-all ${
                  form.type === t.value
                    ? "border-[#4f9669] bg-[#4f9669]/10 text-[#4f9669]"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Нэр</label>
          <Input
            placeholder="Buddy"
            value={form.petName}
            onChange={(e) => setForm((f) => ({ ...f, petName: e.target.value }))}
            className="h-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Үүлдэр</label>
          <Input
            placeholder="Golden Retriever"
            value={form.breed}
            onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))}
            className="h-10"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Нас</label>
          <Input
            placeholder="2 жил"
            value={form.age}
            onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
            className="h-10"
          />
        </div>
      </div>
    </div>
  );
}
