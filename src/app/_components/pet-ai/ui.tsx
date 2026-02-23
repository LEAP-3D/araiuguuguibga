"use client";

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-orange-100 bg-orange-50/30 p-3">
      <div className="text-xs font-medium text-slate-700">{label}</div>
      <div className="text-sm text-slate-900 text-right">{value}</div>
    </div>
  );
}

export function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}
