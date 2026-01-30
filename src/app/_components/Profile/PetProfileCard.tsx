import { Camera } from 'lucide-react';

export default function PetProfileCard({ pet }: any) {
  return (
    <div className="bg-white w-64 rounded-2xl shadow-lg overflow-hidden p-5">
      {/* Avatar */}
      <div className="relative flex justify-center">
        <div className="w-24 h-24 rounded-full bg-green-500 text-white text-3xl flex items-center justify-center ring-4 ring-white">{pet.type === 'dog' ? '🐶' : pet.type === 'cat' ? '🐱' : '🐾'}</div>

        <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:bg-gray-300 transition">
          {' '}
          <Camera className="w-4 h-4" />{' '}
        </button>
      </div>

      {/* Name */}
      <h2 className="text-xl font-bold text-center mt-4">{pet.name}</h2>

      {/* Type */}
      <p className="text-sm text-center text-gray-500 mb-3">
        {pet.type === 'dog' && 'Нохой'}
        {pet.type === 'cat' && 'Муур'}
        {pet.type === 'bird' && 'Шувуу'}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 mt-3">
        <span className="font-medium">Үүлдэр:</span>
        <span>{pet.breed || '-'}</span>

        <span className="font-medium">Нас:</span>
        <span>{pet.age ? `${pet.age} нас` : '-'}</span>

        <span className="font-medium">Жин:</span>
        <span>{pet.weight ? `${pet.weight} кг` : '-'}</span>

        <span className="font-medium">Өнгө:</span>
        <span>{pet.color || '-'}</span>
      </div>
    </div>
  );
}
