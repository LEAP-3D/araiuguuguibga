import { CircleAlert } from 'lucide-react';

export default function VaccinationCard() {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 flex gap-4">
      <div className="flex items-center ">
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-100">
          <CircleAlert className="w-6 h-6 text-red-500" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center ">
          <div className="flex gap-2 items-center">
            <h4 className="text-lg font-semibold">Rabies Vaccine</h4>
            <div className="w-fit py-2 px-4 bg-yellow-100 rounded-full">
              <p className="text-sm text-black">Bumble</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-500">01/15/2023</span>
          <p className="text-red-600">Next Due: 01/15/2024</p>
        </div>
      </div>
    </div>
  );
}
