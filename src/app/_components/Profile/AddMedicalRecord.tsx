'use client';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VaccineDate } from './VaccineDate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Syringe } from 'lucide-react';
import { useState } from 'react';

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
  onAddRecord: (record: PetMedicalForm) => void;
};

export default function AddMedicalRecord({ onAddRecord }: Props) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!form.pet || !form.type || !form.medicine || !form.date) {
      alert('Please fill in all required fields');
      return;
    }

    onAddRecord(form);

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
        <div className="w-fit h-fit bg-[#ef9241] rounded-2xl py-3 px-5 flex items-center gap-2 justify-center text-white font-medium hover:bg-green-800 cursor-pointer transition">
          <Plus />
          Add
        </div>
      </DialogTrigger>
      <DialogContent className="w-120 ">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-xl font-semibold">
              <Syringe className="text-green-600 mb-2" />
              Add Medical Record
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Pet *</label>
                <Select value={form.pet || ''} onValueChange={(v) => setForm((f) => ({ ...f, pet: v }))}>
                  <SelectTrigger className="px-5 py-2 rounded-xl border bg-[#f7fff3]">
                    <SelectValue placeholder="Select Pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bumble">Bumble</SelectItem>
                    <SelectItem value="kitty">Kitty</SelectItem>
                    <SelectItem value="tommy">Tommy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Type *</label>
                <Select value={form.type || ''} onValueChange={(v) => setForm((f) => ({ ...f, type: v as 'vaccine' | 'medicine' | 'treatment' | 'surgery' }))}>
                  <SelectTrigger className="px-5 py-2 rounded-xl border bg-[#f7fff3]">
                    <SelectValue placeholder="Select Type" />
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
            <div className="flex gap-4">
              <div className="flex gap-1 flex-col">
                <label className="block text-sm font-semibold text-foreground mb-2">Date *</label>
                <VaccineDate value={form.date} onChange={(date) => setForm((f) => ({ ...f, date }))} />
              </div>
              <div className="flex gap-1 flex-col">
                <label className="block text-sm font-semibold text-foreground mb-2">Next Due Date</label>
                <VaccineDate value={form.nextDueDate} onChange={(date) => setForm((f) => ({ ...f, nextDueDate: date }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Vet / Clinic Name</label>
              <input
                value={form.vet || ''}
                onChange={(e) => setForm((f) => ({ ...f, vet: e.target.value }))}
                className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                placeholder="Happy Paws Hospital"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Notes</label>
              <textarea
                value={form.note || ''}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                placeholder="Any additional notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-xl px-8 py-2">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-xl px-8 py-2 bg-gradient-to-r from-[#09712e] to-[#51986a] text-white shadow-md hover:opacity-90">
              Add Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
