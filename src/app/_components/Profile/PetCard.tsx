'use client';
/* eslint-disable max-lines */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Pet } from '@/lib/petsContext';
import { usePets } from '@/lib/petsContext';
import { Heart, Weight, Eye, PawPrint, Pencil, Trash2, Cake, StickyNote, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type PetCardProps = {
  pet: Pet;
  compact?: boolean;
};

type EditForm = Omit<Pet, 'id'>;

export function PetCard({ pet, compact = false }: PetCardProps) {
  const { updatePet, deletePet } = usePets();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [action, setAction] = useState<'idle' | 'saving' | 'deleting'>('idle');
  const [form, setForm] = useState<EditForm>({
    name: pet.name,
    type: pet.type,
    breed: pet.breed,
    age: pet.age,
    weight: pet.weight,
    gender: pet.gender,
    note: pet.note,
    image: pet.image,
  });

  useEffect(() => {
    setForm({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      age: pet.age,
      weight: pet.weight,
      gender: pet.gender,
      note: pet.note,
      image: pet.image,
    });
  }, [pet]);

  const handleSave = async () => {
    if (action !== 'idle') return;
    if (!form.name.trim() || !form.type.trim()) {
      toast.error('Нэр болон төрлөө бөглөнө үү.');
      return;
    }
    setAction('saving');
    try {
      const ok = await updatePet(pet.id, {
        ...form,
        name: form.name.trim(),
        type: form.type.trim(),
      });
      if (!ok) {
        toast.error('Засах үед алдаа гарлаа.');
        return;
      }
      toast.success('Амьтны мэдээлэл шинэчлэгдлээ.');
      setEditing(false);
    } finally {
      setAction('idle');
    }
  };

  const handleDelete = async () => {
    if (action !== 'idle') return;
    const confirmed = window.confirm(`"${pet.name}"-г устгах уу?`);
    if (!confirmed) return;
    setAction('deleting');
    try {
      const ok = await deletePet(pet.id);
      if (!ok) {
        toast.error('Устгах үед алдаа гарлаа.');
        return;
      }
      toast.success('Амьтан устгагдлаа.');
      setOpen(false);
    } finally {
      setAction('idle');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setEditing(false);
      }}
    >
      <DialogTrigger asChild>
        <div
          style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
          className={`group cursor-pointer rounded-2xl border border-[#f1e6d9] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(94,73,58,0.15)] ${
            compact ? 'w-44' : 'w-60'
          }`}
        >
          <div className={`relative flex items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100 ${compact ? 'h-28' : 'h-40'}`}>
            {pet.image ? <Image src={pet.image} alt={pet.name} fill className="object-cover" sizes={compact ? '176px' : '240px'} /> : <PawPrint className="h-12 w-12 text-gray-300" />}
          </div>

          <div className={compact ? 'p-3' : 'p-4'}>
            <div className="flex items-center justify-between">
              <h3 className={`truncate font-bold text-[#463327] ${compact ? 'text-base' : 'text-lg'}`}>{pet.name}</h3>
              <span className={`rounded-full bg-orange-100 capitalize text-orange-700 ${compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'}`}>{pet.type}</span>
            </div>
            <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-[#958071]`}>{pet.breed}</p>
            <div className={`flex flex-wrap pt-1 text-xs text-[#463327] ${compact ? 'gap-2' : 'gap-3'}`}>
              <div className="flex items-center gap-1 font-medium text-[#61ae7d]">{pet.age} years</div>
              <div className="flex items-center gap-1">
                <Weight className="h-3 w-3" />
                {pet.weight} kg
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-pink-500" />
                {pet.gender}
              </div>
            </div>
          </div>

          <div className={`flex justify-center ${compact ? 'pb-3' : 'pb-4'}`}>
            <div
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 border-[#eae4dc] bg-[#f6f2e9] font-semibold text-[#5e493a] transition-all duration-200 group-hover:bg-[#5e493a] group-hover:text-white ${
                compact ? 'h-8 w-[160px] text-xs' : 'h-10 w-50 text-sm'
              }`}
            >
              <Eye className="h-4 w-4" />
              <p>Дэлгэрэнгүй харах</p>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[480px] overflow-hidden rounded-[24px] border-0 p-0" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <DialogHeader className="sr-only">
          <DialogTitle>{editing ? 'Амьтны мэдээлэл засах' : pet.name}</DialogTitle>
        </DialogHeader>

        {editing ? (
          <div className="flex flex-col gap-2 bg-[#faf7f4] p-6">
            <p className="mb-1 text-xl font-bold text-[#2d1f14]">Мэдээлэл засах</p>
            <input
              className="w-full rounded-xl border border-[#e8e0d8] bg-white px-3 py-2.5 text-sm text-[#2d1f14] outline-none focus:border-[#5e493a]"
              placeholder="Нэр"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-[#e8e0d8] bg-white px-3 py-2.5 text-sm text-[#2d1f14] outline-none focus:border-[#5e493a]"
              placeholder="Төрөл"
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-[#e8e0d8] bg-white px-3 py-2.5 text-sm text-[#2d1f14] outline-none focus:border-[#5e493a]"
              placeholder="Үүлдэр"
              value={form.breed}
              onChange={(e) => setForm((p) => ({ ...p, breed: e.target.value }))}
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                className="w-full rounded-xl border border-[#e8e0d8] bg-white px-3 py-2.5 text-sm text-[#2d1f14] outline-none focus:border-[#5e493a]"
                placeholder="Нас"
                value={form.age}
                onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-[#e8e0d8] bg-white px-3 py-2.5 text-sm text-[#2d1f14] outline-none focus:border-[#5e493a]"
                placeholder="Жин (кг)"
                value={form.weight}
                onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-[#e8e0d8] bg-white px-3 py-2.5 text-sm text-[#2d1f14] outline-none focus:border-[#5e493a]"
                placeholder="Хүйс"
                value={form.gender}
                onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}
              />
            </div>
            <textarea
              className="min-h-20 w-full resize-y rounded-xl border border-[#e8e0d8] bg-white px-3 py-2.5 text-sm text-[#2d1f14] outline-none focus:border-[#5e493a]"
              placeholder="Тэмдэглэл"
              value={form.note}
              onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
            />
            <div className="mt-2 flex gap-2.5">
              <button
                type="button"
                disabled={action !== 'idle'}
                onClick={() => setEditing(false)}
                className="flex-1 rounded-[14px] border border-[#e8e0d8] bg-white px-3 py-3 text-sm font-semibold text-[#5e493a]"
              >
                Болих
              </button>
              <button
                type="button"
                disabled={action !== 'idle'}
                onClick={handleSave}
                className="flex-1 rounded-[14px] bg-[#5e493a] px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4a3829] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {action === 'saving' ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Хадгалж байна...
                  </span>
                ) : (
                  '✓ Хадгалах'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative h-[260px] overflow-hidden">
              {pet.image ? (
                <Image src={pet.image} alt={pet.name} fill className="object-cover" sizes="480px" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f6ede3] to-[#ecddd0]">
                  <PawPrint className="h-16 w-16 text-[#c4a98e]" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(20,12,6,0.72)]" />
              <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-5 text-white">
                <span className="mb-1 inline-block rounded-full border border-white/25 bg-white/20 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] backdrop-blur-sm">{pet.type}</span>
                <h2 className="text-[32px] font-bold leading-[1.1]">{pet.name}</h2>
                <p className="text-sm opacity-80">{pet.breed}</p>
              </div>
            </div>

            <div className="bg-[#faf7f4] p-6">
              <div className="mb-4 grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-[#f0ebe4] bg-white px-3 py-3 text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#e8f5ee] text-[#3a9e6a]">
                    <Cake className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold leading-none text-[#2d1f14]">{pet.age}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.05em] text-[#a89485]">Нас</div>
                </div>
                <div className="rounded-2xl border border-[#f0ebe4] bg-white px-3 py-3 text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#eef1fb] text-[#4a67d4]">
                    <Weight className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-semibold leading-none text-[#2d1f14]">
                    {pet.weight}
                    <span className="ml-1 text-xs font-normal text-[#a89485]">кг</span>
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.05em] text-[#a89485]">Жин</div>
                </div>
                <div className="rounded-2xl border border-[#f0ebe4] bg-white px-3 py-3 text-center">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#fceef4] text-[#d4497a]">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-semibold leading-none text-[#2d1f14]">{pet.gender}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.05em] text-[#a89485]">Хүйс</div>
                </div>
              </div>

              {pet.note ? (
                <div className="mb-2.5 rounded-2xl border border-[#f0ebe4] bg-white p-4">
                  <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#a89485]">
                    <StickyNote className="h-[13px] w-[13px]" />
                    Тэмдэглэл
                  </div>
                  <p className="text-sm leading-relaxed text-[#3d2c1e]">{pet.note}</p>
                </div>
              ) : null}

              <div className="mt-4 flex gap-2.5">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#5e493a] px-3 py-[13px] text-sm font-semibold text-white transition-colors hover:bg-[#4a3829] disabled:cursor-not-allowed disabled:opacity-55"
                  disabled={action !== 'idle'}
                  onClick={() => setEditing(true)}
                >
                  <Pencil className="h-4 w-4" />
                  Засах
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-[14px] border border-[#fdd5d0] bg-[#fff0ee] px-[18px] py-[13px] text-sm font-semibold text-[#c0392b] transition-colors hover:bg-[#ffe0dc] disabled:cursor-not-allowed disabled:opacity-55"
                  disabled={action !== 'idle'}
                  onClick={handleDelete}
                >
                  {action === 'deleting' ? (
                    <>
                      <Loader2 className="h-[15px] w-[15px] animate-spin" />
                      Устгаж байна...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-[15px] w-[15px]" />
                      Устгах
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
