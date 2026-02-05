'use client';

import { Bell } from 'lucide-react';
import { toDateOnlyStr, getTodayStr } from './profileDateUtils';

type DueRecord = { id?: string; pet: string; type: string; medicine?: string; nextDueDate?: string; date: string };

export function DueTodayBanner({ records }: { records: DueRecord[] }) {
  if (records.length === 0) return null;
  const today = getTodayStr();
  return (
    <div className="mb-6 w-full max-w-2xl rounded-xl border border-amber-200 bg-amber-50/95 dark:bg-amber-950/30 dark:border-amber-800 p-4 shadow-sm flex items-start gap-3">
      <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-amber-900 dark:text-amber-100">Today&apos;s medical reminders</p>
        <ul className="text-sm text-amber-800 dark:text-amber-200 list-disc list-inside space-y-0.5">
          {records.map((r) => (
            <li key={r.id ?? `${r.pet}-${r.date}-${r.type}`}>
              <span className="font-medium">{r.pet}</span>: {r.type}
              {r.medicine ? ` — ${r.medicine}` : ''}
              {toDateOnlyStr(r.nextDueDate) === today ? ' (due today)' : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
