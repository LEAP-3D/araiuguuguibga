import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ProfileDetails from './ProfileDetails';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type HeaderUserMenuProps = {
  displayName: string;
  initial: string;
  imageUrl?: string; // Changed from `string | undefined` to optional with `?`
};

export default function ProfileCard({ displayName, initial, imageUrl }: HeaderUserMenuProps) {
  return (
    <div className="bg-[#fefdfc] w-100 h-60 rounded-2xl shadow-lg flex justify-between pr-6 items-center">
      <div className="flex flex-col gap-3 items-center">
        <div className="p-6 flex gap-4 ">
          <Avatar className="size-30 rounded-full bg-[#51986a] text-white border-2 border-white/80 shadow-md">
            <AvatarImage src={imageUrl} alt={displayName} />
            <AvatarFallback className="bg-[#87199a] text-white text-sm font-semibold">{initial}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-0.5">
            <span className="text-gray-800 font-medium max-w-30 truncate">{displayName}</span>
            <div className="flex gap-1 text-sm text-gray-600">
              <p>pet owner</p>.<p>2 cats</p>
            </div>
            <div className="text-sm text-gray-600">Ulaanbaatar</div>
          </div>
        </div>
        <div className="px-5 mb-5">
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-90 h-12 bg-[#f6f2e9] text-[#5e493a] font-semibold rounded-2xl p-3 border-2 border-[#eae4dc] flex justify-center gap-2 cursor-pointer">
                <Eye />
                <p>View details</p>
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
      </div>
    </div>
  );
}