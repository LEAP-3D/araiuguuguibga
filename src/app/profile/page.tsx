'use client';

import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { useRouter } from 'next/navigation';
import { PawPrint } from 'lucide-react';
import ProfileCard from '../_components/Profile/ProfileCard';

export default function Profile() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/');
  };
  return (
    <div className="relative min-h-screen bg-[linear-gradient(#4fa673_0_20%,#faf8f5_20%_100%)]">
      <div className="absolute bottom-0 h-[80%] w-full bg-[url('/paws.svg')] bg-repeat bg-size-[110px] opacity-40 pointer-events-none" />
      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <button className="mb-6 font-medium px-4 py-2 hover:bg-green-100 rounded-lg transition" onClick={handleButtonClick}>
          ← Back to home
        </button>
        <div className="flex flex-col gap-5 items-center">
       <ProfileCard/>

        {/* PETS SECTION */}
        <div className="rounded-2xl w-200 shadow-lg p-6 flex flex-col overflow-auto ">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PawPrint className="text-green-700" /> My Pets
          </h3>
          <div className="gap-3 flex  overflow-auto ">
            <AddPetDialog />
          </div>
        </div></div>
      </main>
    </div>
  );
}
