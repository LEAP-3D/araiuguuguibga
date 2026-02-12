import { NextResponse } from 'next/server';
import { getAdminMessaging } from '@/lib/firebase-admin';

/**
 * POST /api/subscribe-posts
 * Body: { token: string } — FCM device token
 * Subscribes the token to the 'posts' topic so it receives post notifications.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === 'string' ? body.token.trim() : '';
    if (!token) {
      return NextResponse.json({ error: 'token required' }, { status: 400 });
    }

    const messaging = getAdminMessaging();
    const res = await messaging.subscribeToTopic([token], 'posts');

    if (res.failureCount > 0) {
      const failed = res.errors?.find(() => true);
      return NextResponse.json(
        { error: failed?.error?.message ?? 'Subscribe failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
