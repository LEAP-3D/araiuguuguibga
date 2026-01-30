'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddPetDialog({ setPets }: any) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [species, setSpecies] = useState('');

  const handleAddPet = () => {
    if (!name || !species) return;

    const newPet = {
      name,
      breed,
      age,
      weight,
      color,
      type: species,
    };

    setPets((prev: any) => [...prev, newPet]);

    // reset
    setName('');
    setBreed('');
    setAge('');
    setWeight('');
    setColor('');
    setSpecies('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-4 h-80 rounded-xl border-2 w-60 border-dashed border-gray-300 text-center hover:border-green-500 hover:bg-green-50 transition-colors">
          <div className="text-5xl mb-2">➕</div>
          <div className="font-semibold text-gray-700">Add Pet</div>
          <div className="text-xs text-gray-500">Register new pet</div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-[#FFFDF8] rounded-3xl border border-[#f1e6d9] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#3b2f2f]">🐾 Тэжээвэр амьтан нэмэх</DialogTitle>
        </DialogHeader>

        {/* Name */}
        <div className="my-4">
          <label className="block text-lg font-medium mb-2">Амьтны нэр *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-2 rounded-xl border-2 border-[#51986a] bg-[#fffaf3] outline-none" />
        </div>

        {/* Species + Breed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Select onValueChange={setSpecies}>
            <SelectTrigger className="px-5 py-2 rounded-xl border bg-[#fffaf3]">
              <SelectValue placeholder="Төрөл" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Нохой</SelectItem>
              <SelectItem value="cat">Муур</SelectItem>
              <SelectItem value="bird">Шувуу</SelectItem>
              <SelectItem value="other">Бусад</SelectItem>
            </SelectContent>
          </Select>

          <input placeholder="Үүлдэр" value={breed} onChange={(e) => setBreed(e.target.value)} className="px-5 py-2 rounded-xl border bg-[#fffaf3] outline-none" />
        </div>

        {/* Age + Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <input placeholder="Нас" value={age} onChange={(e) => setAge(e.target.value)} className="px-5 py-2 rounded-xl border bg-[#fffaf3] outline-none" />
          <input placeholder="Жин (кг)" value={weight} onChange={(e) => setWeight(e.target.value)} className="px-5 py-2 rounded-xl border bg-[#fffaf3] outline-none" />
        </div>

        {/* Color */}
        <input placeholder="Өнгө / Тэмдэглэл" value={color} onChange={(e) => setColor(e.target.value)} className="w-full px-5 py-2 rounded-xl border bg-[#fffaf3] mb-6 outline-none" />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl px-8 py-2">
              Болих
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={handleAddPet} className="rounded-xl px-8 py-2 bg-linear-to-r from-[#09712e] to-[#51986a] text-white shadow-md hover:opacity-90">
              Нэмэх
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
