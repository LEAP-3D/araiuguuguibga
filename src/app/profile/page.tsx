'use client';

import AddPetDialog from '@/app/_components/Profile/AddPetDialog';
import { useRouter } from 'next/navigation';
import { PawPrint } from 'lucide-react';

 
export default function Profile() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push('/');
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-yellow-50 to-green-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <button className="mb-6 px-4 py-2 hover:bg-green-100 rounded-lg transition" onClick={handleButtonClick}>
          ← Back to home
        </button>
 
        {/* PETS SECTION */}
        <div className=" bg-white rounded-2xl w-310 shadow-lg p-6 flex flex-col overflow-auto ">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PawPrint className="text-green-700" /> My Pets
          </h3>
          <div className="gap-3 flex  overflow-auto ">
            <AddPetDialog />
 
          
          </div>
        </div>
      </main>
    </div>
  );
}
 
