import { Calendar, CalendarClock, FileText, Hospital, Pill, Trash2 } from 'lucide-react';
import type { PetMedicalForm } from './AddMedicalRecord';
type RecordProps = {
  record: PetMedicalForm & { id?: string };
  onDelete?: (id: string) => void | Promise<void>;
  deleting?: boolean;
};
export default function MedicalCard({ record, onDelete, deleting = false }: RecordProps) {
  const canDelete = Boolean(record.id && onDelete);

  return (
    <div className="w-140 h-60 bg-white rounded-2xl shadow-md pl-6 py-5 flex gap-4">
      <div className="flex ">
        <div className="flex items-center justify-center w-11 h-11 rounded-full shadow-2xl">
          <Pill className="w-6 h-6 text-orange-600" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center ">
          <div className="flex justify-between w-113">
            <div className="text-lg font-semibold">{record.medicine}</div>
            <div className="flex gap-2 font-semibold text-[17px]">
              <div className="w-fit px-4 bg-yellow-100 rounded-full py-2 h-9">
                <p className="text-sm text-orange-950">{record.pet}</p>
              </div>
              <div className="w-fit  px-4 bg-red-100 rounded-full py-2 h-9">
                <p className="text-sm text-red-950">{record.type}</p>
              </div>
              {canDelete ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!record.id) return;
                    void onDelete?.(record.id);
                  }}
                  disabled={deleting}
                  className="h-9 rounded-full border border-[#fdd5d0] bg-[#fff0ee] px-3 text-sm text-[#c0392b] transition-colors hover:bg-[#ffe0dc] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Trash2 className="h-4 w-4" />
                    {deleting ? 'Устгаж байна...' : 'Устгах'}
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 mt-1 text-gray-500" />
            <span className="text-m text-gray-500">{record.date}</span>
          </div>
          <div className="flex">
            <CalendarClock className="w-4 h-4 mr-2 mt-1 text-gray-500" />
            <p className="text-red-600">Next Due: {record.nextDueDate}</p>
          </div>
          <div className="flex">
            <Hospital className="w-4 h-4 mr-2 mt-1 text-gray-500" />
            <p className=" text-gray-500">{record.vet}</p>
          </div>
          <div className="flex pl-6">
            <FileText className="w-4 h-4 mr-2 mt-1 text-gray-500" />
            <p className=" text-gray-500">{record.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
