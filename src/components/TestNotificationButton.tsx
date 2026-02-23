'use client';

import { useState } from 'react';

/**
 * 1) Sends test notification to 'posts' topic → all subscribed users get push.
 * 2) Shows a local notification to the clicker so they see it immediately.
 */
export function TestNotificationButton() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setStatus('sending');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Notification',
          body: 'Энэ бол My App-аас илгээсэн туршилтын мэдэгдэл.',
          data: { url: '/dashboard/find-animals' },
        }),
      });
      const text = await res.text();
      const data = text ? (() => { try { return JSON.parse(text) as { error?: string }; } catch { return {}; } })() : {};
      if (res.ok) {
        setStatus('ok');
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          try {
            new Notification('Test Notification', {
              body: 'Энэ бол My App-аас илгээсэн туршилтын мэдэгдэл. Бусад идэвхжүүлсэн хэрэглэгчид ч ижил мэдэгдэл ирнэ.',
              icon: '/caticon.png',
            });
          } catch {
            // ignore
          }
        }
      } else {
        let msg = typeof data.error === 'string' ? data.error : res.statusText || `HTTP ${res.status}`;
        if (res.status === 500 && (msg.includes('env') || msg.includes('FB_') || msg.includes('тохируул'))) {
          msg += ' Vercel дээр Environment Variables тохируулаад Redeploy хийнэ үү.';
        }
        setErrorMessage(msg);
        setStatus('error');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Сүлжээний алдаа';
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'sending'}
        title="Утас дээр ирүүлэх: эхлээд утаснаасаа сайт нээгээд Мэдэгдэл идэвхжүүлнэ"
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 disabled:opacity-50"
      >
        {status === 'idle' && 'Test мэдэгдэл явуулах'}
        {status === 'sending' && 'Илгээж байна…'}
        {status === 'ok' && 'Илгээгдлээ'}
        {status === 'error' && 'Алдаа гарлаа'}
      </button>
      {errorMessage ? (
        <p className="max-w-xs text-right text-xs text-red-600" title={errorMessage}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
