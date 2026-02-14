'use client';

import { useState } from 'react';

/**
 * Sends a test notification to the 'posts' topic (all subscribed devices).
 * Requires FB_PROJECT_ID+FB_CLIENT_EMAIL+FB_PRIVATE_KEY (or FIREBASE_SERVICE_ACCOUNT_*) and /api/send-notification.
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
      } else {
        const msg = typeof data.error === 'string' ? data.error : res.statusText || `HTTP ${res.status}`;
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
