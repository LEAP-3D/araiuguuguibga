'use client';

import { useState } from 'react';
import { requestPermissionAndSubscribe } from '@/lib/pushNotifications';

/**
 * Example: button to request notification permission and subscribe to push.
 * Subscription is logged to the browser console (for copying to your backend).
 */
export function EnablePushButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const handleClick = async () => {
    setStatus('loading');
    try {
      const sub = await requestPermissionAndSubscribe();
      setStatus(sub ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === 'loading'}
      className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 disabled:opacity-50"
    >
      {status === 'idle' && 'Enable notifications'}
      {status === 'loading' && 'Requesting…'}
      {status === 'ok' && 'Subscribed (see console)'}
      {status === 'error' && 'Failed or denied'}
    </button>
  );
}
