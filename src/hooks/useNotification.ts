'use client';

import { useCallback, useEffect, useState } from 'react';
import { getFCMToken } from '@/lib/firebase';

type PermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

export function useNotification() {
  const [permission, setPermission] = useState<PermissionState>('default');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updatePermission = useCallback(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission as PermissionState);
  }, []);

  useEffect(() => {
    updatePermission();
  }, [updatePermission]);

  /**
   * Request notification permission, get FCM token, and subscribe to 'posts' topic.
   * Call this when user taps "Enable notifications".
   */
  const requestPermission = useCallback(async (): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      if (typeof window === 'undefined' || !('Notification' in window)) {
        setPermission('unsupported');
        return null;
      }

      let perm = Notification.permission;
      if (perm === 'default') {
        perm = await Notification.requestPermission();
      }
      setPermission(perm as PermissionState);

      if (perm !== 'granted') {
        return null;
      }

      const fcmToken = await getFCMToken();
      if (!fcmToken) {
        setError('Could not get FCM token. Check Firebase config and /firebase-messaging-sw.js.');
        return null;
      }

      setToken(fcmToken);

      const [postsRes, registerRes] = await Promise.all([
        fetch('/api/subscribe-posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: fcmToken }),
        }),
        fetch('/api/register-fcm-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: fcmToken }),
        }),
      ]);

      if (!postsRes.ok) {
        const data = await postsRes.json().catch(() => ({}));
        setError(data.error ?? 'Failed to subscribe to notifications');
        return fcmToken;
      }
      if (!registerRes.ok) {
        // Still return token; medical reminder push may not work until they re-enable
      }

      return fcmToken;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Notification request failed';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Subscribe an existing FCM token to the 'posts' topic (e.g. after login).
   */
  const subscribeToPosts = useCallback(async (fcmToken: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/subscribe-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: fcmToken }),
      });
      if (res.ok) setToken(fcmToken);
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  return {
    permission,
    token,
    error,
    loading,
    requestPermission,
    subscribeToPosts,
    updatePermission,
  };
}
