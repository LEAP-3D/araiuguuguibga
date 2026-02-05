import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Pet } from '../types';

type Props = {
  pet: Pet;
  onClose: () => void;
};

export function PetDetails({ pet, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>{pet.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1">
          <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-md relative h-60">
            {/* Image */}
            {pet.image ? (
              <Image src={pet.image} alt={pet.name} fill className="object-cover" sizes="(max-width: 448px) 100vw, 448px" />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4">
              <h2 className="text-xl font-bold">{pet.name}</h2>
              <p>
                <strong>Төрөл:</strong> {pet.type}
              </p>
              <p>
                <strong>Үүлдэр:</strong> {pet.breed}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <p>
              <strong>Нас:</strong> {pet.age}
            </p>
            <p>
              <strong>Жин:</strong> {pet.weight} кг
            </p>
            <p>
              <strong>Huis:</strong> {pet.gender}
            </p>
          </div>
          <p>
            <strong>Тэмдэглэл:</strong> {pet.note}
          </p>

          <p>
            <strong>Allergies:</strong> {pet.allergies}
          </p>
          <p>
            <strong>Microchip ID:</strong> {pet.microchip}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button>Хаах</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
