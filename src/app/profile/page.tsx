"use client";
import ProfileCard from "@/app/_components/Account/ProfileCard";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import AddPetModal from "../_components/AddPetDialog";

const Profile = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/");
  };
  const vaccineHistory = [
    {
      vaccine: "Rabies Vaccine",
      date: "Dec 15, 2024",
      nextDue: "Dec 15, 2025",
    },
    { vaccine: "DHPP Vaccine", date: "Nov 20, 2024", nextDue: "Nov 20, 2025" },
    { vaccine: "Bordetella", date: "Oct 10, 2024", nextDue: "Oct 10, 2025" },
  ];

  return (
    <div className="min-h-screen  bg-linear-to-br from-green-50 via-yellow-50 to-green-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <button
          className="mb-6 px-4 py-2 hover:bg-green-100 rounded-lg transition cursor-pointer  "
          onClick={handleButtonClick}
        >
          ← Back to home
        </button>

        <div className="flex gap-8">
          {/* USER SECTION */}
          <ProfileCard
            name="Sarah Johnson"
            subtitle="sarah@example.com"
            location="📍 San Francisco, CA"
            emoji="👤"
            gradientFrom="green-400"
            gradientTo="pink-500"
          >
            {/* Add Edit button inside the ProfileCard */}
          </ProfileCard>
        </div>

        {/* PETS SECTION */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            🐾 My Pets
          </h3>
          <div className="gap-3 flex">
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-4 rounded-2xl border-2 w-60 border-dashed border-gray-300 text-center hover:border-green-500 hover:bg-green-50 transition-colors">
                  <div className="text-5xl mb-2">➕</div>
                  <div className="font-semibold text-gray-700">Add Pet</div>
                  <div className="text-xs text-gray-500">Register new pet</div>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a Pet</DialogTitle>
                </DialogHeader>
                <AddPetModal />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="rounded-2xl px-8 py-5 text-lg border-[#eadfd2]"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="rounded-2xl px-8 py-5 text-lg bg-linear-to-r from-[#4b8662] to-[#4f9769] hover:opacity-90 text-white shadow-md">
                    Add Pet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <ProfileCard
              name="Buddy"
              subtitle="Golden Retriever"
              location="🎂 3 years"
              emoji="🐕"
              gradientFrom="green-400"
              gradientTo="pink-500"
            />
          </div>
        </div>

        {/* VACCINE HISTORY */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            💉 Vaccination History
          </h3>
          <div className="space-y-3">
            {vaccineHistory.map((record, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  💉
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{record.vaccine}</p>
                  <p className="text-sm text-gray-600">
                    Last administered: {record.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Next due</p>
                  <p className="text-sm font-medium text-green-600">
                    {record.nextDue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
