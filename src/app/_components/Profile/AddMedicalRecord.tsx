'use client';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VaccineDate } from './VaccineDate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Syringe } from 'lucide-react';
export default function AddMedicalRecord() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="w-fit h-fit bg-[#ef9241] rounded-2xl py-3 px-5 flex items-center gap-2 justify-center text-white font-medium hover:bg-green-800 cursor-pointer transition">
            <Plus />
            Add Record
          </div>
        </DialogTrigger>
        <DialogContent className="w-120 ">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-xl font-semibold">
              <Syringe className="text-green-600 mb-2" />
              Add Vaccination Record
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2  ">
            <div className="flex justify-between">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Pet</label>

                <Select>
                  <SelectTrigger className="px-5 py-2 rounded-xl border bg-[#f7fff3]">
                    <SelectValue placeholder="Select Pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="bumble">Bumble</SelectItem>
                    <SelectItem value="kitty">Kitty</SelectItem>
                    <SelectItem value="tommy">Tommy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Type</label>
                <Select>
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
              <label className="block text-sm font-semibold text-foreground mb-2">Vaccine Name</label>
              <input
                className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                placeholder="Vaccine Name"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex gap-1 flex-col">
                <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                <VaccineDate />
              </div>
              <div className="flex gap-1 flex-col">
                <label className="block text-sm font-semibold text-foreground mb-2">Next Due Date</label>
                <VaccineDate />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Vet / Clinic Name</label>
              <input
                className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                placeholder="happy Paws hospital"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                placeholder="Any additional notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl px-8 py-2">
                Cancel
              </Button>
            </DialogClose>
            <Button className="rounded-xl px-8 py-2 bg-linear-to-r from-[#09712e] to-[#51986a] text-white shadow-md hover:opacity-90">Add Record</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
