import { Camera, Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AddPetModal from './AddPetDialog';

type ProfileCardProps = {
  name: string;
  subtitle: string;
  location?: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
};

const ProfileCard = ({ name, subtitle, location, emoji, gradientFrom, gradientTo }: ProfileCardProps) => {
  return (
    <div className="bg-white w-60 rounded-2xl shadow-lg overflow-hidden">
      {/* Top Gradient */}
      <div className={`h-24 bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`} />

      <div className="pt-0 -mt-12 text-center px-6 pb-6">
        {/* Avatar */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center ring-4 ring-white">{emoji}</div>

          {/* Camera Button */}
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:bg-gray-300 transition">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Name + Edit */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <h2 className="text-xl font-bold">{name}</h2>
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-1.5 rounded-full hover:bg-gray-100 transition">
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <AddPetModal />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button className="bg-green-400 text-white hover:bg-green-500">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-sm text-gray-600">{subtitle}</p>

        {location && <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-600">{location}</div>}
      </div>
    </div>
  );
};

export default ProfileCard;
