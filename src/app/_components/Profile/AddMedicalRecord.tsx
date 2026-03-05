/* eslint-disable max-lines */
'use client';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VaccineDate } from './VaccineDate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Syringe } from 'lucide-react';
import { useState } from 'react';
import type { Pet } from '@/lib/petsContext';
import { toast } from 'sonner';

export type PetMedicalForm = {
  pet: string;
  type: 'vaccine' | 'medicine' | 'treatment' | 'surgery' | '';
  medicine: string;
  vet: string;
  note: string;
  date: string;
  nextDueDate: string;
};

type Props = {
  pets?: Pet[];
  onAddRecord: (record: PetMedicalForm) => Promise<void> | void;
  compact?: boolean;
};

export default function AddMedicalRecord({ pets = [], onAddRecord, compact = false }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<PetMedicalForm>({
    pet: '',
    type: '',
    medicine: '',
    vet: '',
    note: '',
    date: '',
    nextDueDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!form.pet || !form.type || !form.medicine || !form.date) {
      toast.error('Заавал бөглөх талбаруудаа бөглөнө үү.');
      return;
    }

    setSubmitting(true);
    try {
      const petName = pets.find((p) => p.id === form.pet)?.name ?? form.pet;
      await Promise.resolve(onAddRecord({ ...form, pet: petName }));
      toast.success('Эрүүл мэндийн бүртгэл амжилттай нэмэгдлээ.');
    } catch {
      toast.error('Бүртгэл нэмэх үед алдаа гарлаа.');
      setSubmitting(false);
      return;
    } finally {
      setSubmitting(false);
    }

    // Reset form and close dialog
    setForm({
      pet: '',
      type: '',
      medicine: '',
      vet: '',
      note: '',
      date: '',
      nextDueDate: '',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`h-fit rounded-2xl bg-[#ef9241] flex items-center py-1 justify-center gap-2 text-white font-medium hover:bg-orange-400 cursor-pointer transition ${
            compact ? 'w-full px-3 py-1.5 text-sm' : 'w-fit px-5 py-3'
          }`}
        >
          <div className="flex gap-1 font-extrabold items-center">
            <Plus className="w-full md:w-auto" />
            Hэмэх
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className={`${compact ? 'max-h-[80dvh] max-w-[94vw] overflow-y-auto p-4' : 'w-120 p-6'} gap-4`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-xl font-semibold mb-2">
              <Syringe className="text-orange-800 mb-2" />
              Эрүүл мэндийн бүртгэл нэмэх
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className={`flex ${compact ? 'flex-col gap-3' : 'justify-between'}`}>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Тэжээвэр амьтан *</label>
                <Select value={form.pet || ''} onValueChange={(v) => setForm((f) => ({ ...f, pet: v }))}>
                  <SelectTrigger className="px-5 py-2 rounded-xl border bg-[#fffef3]">
                    <SelectValue placeholder="Тэжээвэр амьтан сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Төрөл *</label>
                <Select value={form.type || ''} onValueChange={(v) => setForm((f) => ({ ...f, type: v as 'vaccine' | 'medicine' | 'treatment' | 'surgery' }))}>
                  <SelectTrigger className="px-5 py-2 rounded-xl border bg-[#fffbf3]">
                    <SelectValue placeholder="Төрөл сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vaccine">Вакцин</SelectItem>
                    <SelectItem value="medicine">Эм</SelectItem>
                    <SelectItem value="treatment">Эмчилгээ</SelectItem>
                    <SelectItem value="surgery">Мэс засал</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Эмийн нэр *</label>
              <input
                value={form.medicine || ''}
                onChange={(e) => setForm((f) => ({ ...f, medicine: e.target.value }))}
                className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                placeholder="Эмийн нэр"
              />
            </div>
            <div className={`flex ${compact ? 'flex-col gap-3' : 'gap-4'}`}>
              <div className="flex gap-1 flex-col">
                <label className="block text-sm font-semibold text-foreground mb-2">Огноо *</label>
                <VaccineDate value={form.date} onChange={(date) => setForm((f) => ({ ...f, date }))} />
              </div>
              <div className="flex gap-1 flex-col">
                <label className="block text-sm font-semibold text-foreground mb-2">Дараагийн товлосон огноо</label>
                <VaccineDate value={form.nextDueDate} onChange={(date) => setForm((f) => ({ ...f, nextDueDate: date }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Клиникийн нэр</label>
              <input
                value={form.vet || ''}
                onChange={(e) => setForm((f) => ({ ...f, vet: e.target.value }))}
                className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                placeholder="Happy Paws Hospital"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Тэмдэглэл</label>
              <textarea
                value={form.note || ''}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                placeholder="Нэмэлт тэмдэглэл..."
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-xl px-8 py-2">
                Цуцлах
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={submitting}
              className="rounded-xl px-8 py-2 bg-linear-to-r from-[#ff9100] to-[#ffae00] text-white shadow-md hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Илгээж байна...
                </>
              ) : (
                'Бүртгэл нэмэх'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
