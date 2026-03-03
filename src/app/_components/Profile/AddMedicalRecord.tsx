'use client';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VaccineDate } from './VaccineDate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Syringe } from 'lucide-react';
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

    try {
      await Promise.resolve(onAddRecord(form));
      toast.success('Эрүүл мэндийн бүртгэл амжилттай нэмэгдлээ.');
    } catch {
      toast.error('Бүртгэл нэмэх үед алдаа гарлаа.');
      return;
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
          className={`h-fit w-fit rounded-2xl bg-[#ef9241] flex items-center justify-center gap-2 text-white font-medium hover:bg-orange-400 cursor-pointer transition ${
            compact ? 'px-3 py-2 text-sm' : 'px-5 py-3'
          }`}
        >
          <Plus className="w-full md:w-auto" />
          нэмэх
        </div>
      </DialogTrigger>
      <DialogContent className={`${compact ? 'max-w-[94vw]' : 'w-120'} gap-5 p-6`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
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
                    {pets.map((pet, index) => (
                      <SelectItem key={`${pet.id}-${index}`} value={pet.name}>
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
                    <SelectItem value="vaccine">Vaccine</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="treatment">Treatment</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Medicine Name *</label>
              <input
                value={form.medicine || ''}
                onChange={(e) => setForm((f) => ({ ...f, medicine: e.target.value }))}
                className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                placeholder="Medicine Name"
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
            <Button type="submit" className="rounded-xl px-8 py-2 bg-linear-to-r from-[#ff9100] to-[#ffae00] text-white shadow-md hover:opacity-90">
              Бүртгэл нэмэх
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
