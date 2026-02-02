import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VaccineDate } from './VaccineDate';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectLabel, SelectValue } from '@/components/ui/select';
import { Plus, Syringe } from 'lucide-react';
export default function AddVaccineRecord() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="w-fit h-fit bg-green-700 rounded-full py-2 px-4 flex items-center justify-center text-white font-medium hover:bg-green-800 cursor-pointer transition">
            <Plus />
            Add Vaccination
          </div>
        </DialogTrigger>
        <DialogContent className="w-114 p-6">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-xl font-semibold">
              <Syringe className="text-green-700 mb-2" />
              Add Vaccination Record
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2  ">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Pet</label>
              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select Pet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Pets</SelectLabel>
                    <SelectItem value="pet">All Pets</SelectItem>
                    <SelectItem value="pet">Bumble</SelectItem>
                    <SelectItem value="pet">Kitty</SelectItem>
                    <SelectItem value="pet">Tommy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                <label className="block text-sm font-semibold text-foreground mb-2">Date Given</label>
                <VaccineDate />
              </div>
              <div className="flex gap-1 flex-col">
                <label className="block text-sm font-semibold text-foreground mb-2">Next Due Date</label>
                <VaccineDate />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Veterinarian</label>
              <input
                className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                placeholder="Dr. Smith"
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Record</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
