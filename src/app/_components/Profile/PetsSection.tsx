import { useState } from 'react';
import AddPetDialog from './AddPetDialog';
import PetProfileCard from './PetProfileCard';

export default function PetsSection() {
  const [pets, setPets] = useState<any[]>([]);

  return (
    <div className="flex gap-6 flex-wrap">
      <AddPetDialog setPets={setPets} />

      {pets.map((pet, index) => (
        <PetProfileCard key={index} pet={pet} />
      ))}
    </div>
  );
}
