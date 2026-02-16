'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Backend мэдэгдлийн тохиргоо шалгана — ажиллаж байгаа эсэхийг харахад ашиглана. */
export function NotificationConfigCheck() {
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [checking, setChecking] = useState(false);

  const runCheck = async () => {
    setChecking(true);
    setResult(null);
    try {
      const res = await fetch('/api/notification-check');
      const data = (await res.json()) as { ok?: boolean; message?: string };
      setResult({ ok: !!data.ok, message: data.message ?? (res.ok ? 'OK' : 'Алдаа') });
    } catch (e) {
      setResult({ ok: false, message: e instanceof Error ? e.message : 'Шалгахад алдаа' });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-0.5">
      <button
        type="button"
        onClick={runCheck}
        disabled={checking}
        className="text-[10px] text-gray-500 hover:text-amber-600 underline disabled:opacity-50"
      >
        {checking ? 'Шалгаж байна…' : 'Мэдэгдлийн тохиргоо шалгах'}
      </button>
      {result && (
        <div
          className={cn(
            'flex items-center gap-1 text-[10px]',
            result.ok ? 'text-green-600' : 'text-red-600'
          )}
          title={result.message}
        >
          {result.ok ? <CheckCircle className="h-3 w-3 shrink-0" /> : <XCircle className="h-3 w-3 shrink-0" />}
          <span className="max-w-[200px] truncate">{result.ok ? 'Ажиллаж байна' : result.message}</span>
        </div>
      )}
    </div>
  );
}
