import { AlertTriangle, Calendar, CalendarClock, CheckCircle2, Clock3, FileText, Hospital, Pill, Trash2 } from 'lucide-react';
import type { PetMedicalForm } from './AddMedicalRecord';

type RecordProps = {
  record: PetMedicalForm & { id?: string };
  onDelete?: (id: string) => void | Promise<void>;
  deleting?: boolean;
  compact?: boolean;
};

const typeLabel: Record<string, string> = {
  vaccine: 'Вакцин',
  medicine: 'Эм',
  treatment: 'Эмчилгээ',
  surgery: 'Мэс засал',
};

function getDueStatus(nextDueDate: string | undefined) {
  const raw = nextDueDate?.trim();
  if (!raw) return { text: 'Товлоогүй', tone: 'muted' as const };

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  if (raw < todayStr) return { text: `Хоцорсон • ${raw}`, tone: 'late' as const };
  if (raw === todayStr) return { text: `Өнөөдөр • ${raw}`, tone: 'today' as const };
  return { text: `Хуваарьтай • ${raw}`, tone: 'upcoming' as const };
}

export default function MedicalCard({ record, onDelete, deleting = false, compact = false }: RecordProps) {
  const canDelete = Boolean(record.id && onDelete);
  const normalizedType = (record.type || '').toLowerCase();
  const typeText = typeLabel[normalizedType] ?? record.type;
  const clinicText = record.vet?.trim() ? record.vet : 'Бүртгэгдээгүй';
  const noteText = record.note?.trim() ? record.note : 'Тэмдэглэл байхгүй';
  const due = getDueStatus(record.nextDueDate);
  const dueToneClass =
    due.tone === 'late'
      ? 'bg-red-50 text-red-700 border-red-200'
      : due.tone === 'today'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : due.tone === 'upcoming'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-slate-50 text-slate-500 border-slate-200';
  const DueIcon = due.tone === 'late' ? AlertTriangle : due.tone === 'today' ? Clock3 : due.tone === 'upcoming' ? CheckCircle2 : CalendarClock;

  return (
    <article className={`group relative w-full overflow-hidden rounded-2xl border border-[#efe5d9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(92,66,45,0.12)] ${compact ? 'p-3.5' : 'p-5'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f59e0b] via-[#f97316] to-[#ef4444] opacity-85" />

      <div className={`flex flex-col gap-4 ${compact ? '' : 'sm:flex-row sm:items-start sm:justify-between'}`}>
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 ring-1 ring-orange-100">
            <Pill className="h-5 w-5 text-orange-600" />
          </div>
          <div className="min-w-0">
            <p className={`truncate font-semibold text-[#1b1b1f] ${compact ? 'text-base' : 'text-lg'}`}>{record.medicine}</p>
            <p className={`mt-1 text-[#6b7280] ${compact ? 'text-xs' : 'text-sm'}`}>Эмийн нэр</p>
          </div>
        </div>

        <div className={`flex flex-wrap items-center gap-2 ${compact ? '' : 'sm:justify-end'}`}>
          <span className={`rounded-full bg-[#f8efc2] font-semibold text-[#4c2d12] ${compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'}`}>{record.pet}</span>
          <span className={`rounded-full bg-[#f8dfe4] font-semibold text-[#521b2a] ${compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'}`}>{typeText}</span>
          {canDelete ? (
            <button
              type="button"
              onClick={() => {
                if (!record.id) return;
                void onDelete?.(record.id);
              }}
              disabled={deleting}
              className={`inline-flex items-center gap-1.5 rounded-full border border-[#f5c8c2] bg-[#fff3f1] font-semibold text-[#c0392b] transition-colors hover:bg-[#ffe8e5] disabled:cursor-not-allowed disabled:opacity-60 ${
                compact ? 'h-8 px-3 text-xs' : 'h-10 px-4 text-sm'
              }`}
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? 'Устгаж байна...' : 'Устгах'}
            </button>
          ) : null}
        </div>
      </div>

      <div className={`mt-4 grid gap-3 text-[#4b5563] ${compact ? 'text-xs' : 'text-sm'}`}>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#6b7280]" />
          <span className="font-medium text-[#6b7280]">Хийгдсэн огноо:</span>
          <span>{record.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <DueIcon className="h-4 w-4 text-[#6b7280]" />
          <span className="font-medium text-[#6b7280]">Дараагийн огноо:</span>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${dueToneClass}`}>{due.text}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hospital className="h-4 w-4 text-[#6b7280]" />
          <span className="font-medium text-[#6b7280]">Клиник:</span>
          <span>{clinicText}</span>
        </div>
        <div className="flex items-start gap-2">
          <FileText className="mt-0.5 h-4 w-4 text-[#6b7280]" />
          <span className="font-medium text-[#6b7280]">Тэмдэглэл:</span>
          <p className="break-words">{noteText}</p>
        </div>
      </div>
    </article>
  );
}
