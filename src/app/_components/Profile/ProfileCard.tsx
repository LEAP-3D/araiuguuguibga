import { Camera, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProfileDetails from './ProfileDetails';

export default function ProfileCard() {
  return (
    <div className="bg-[#fefdfc] w-200 h-40 rounded-2xl shadow-lg flex justify-between pr-6 items-center">
      <div className="p-6 flex gap-4 ">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-pink-500 text-white text-3xl flex items-center justify-center ring-4 ring-white">U</div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:bg-gray-300">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-bold mt-4">Ujin Munkhjargal</h2>
          <div className="flex gap-1 text-sm text-gray-600">
            <p>pet owner</p>.<p>2 cats</p>
          </div>
          <div className="text-sm text-gray-600">Ulaanbaatar</div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-12 h-12 bg-[#f3ece3] rounded-lg p-3">
            <Pencil className="text-green-800" />
          </div>
        </DialogTrigger>

        <DialogContent className="w-120 bg-[#fefdfc] rounded-3xl border border-[#f1e6d9] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#3b2f2f]">Edit Profile</DialogTitle>
          </DialogHeader>
          <ProfileDetails />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl px-8 py-2">
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button className="rounded-xl px-8 py-2 bg-linear-to-r from-[#09712e] to-[#51986a] text-white shadow-md hover:opacity-90">Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
