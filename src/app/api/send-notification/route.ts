import { NextResponse } from 'next/server';
import { getAdminMessaging } from '@/lib/firebase-admin';

/**
 * POST /api/send-notification
 * Body: { title?: string, body?: string, data?: Record<string, string> }
 * Sends a notification to all devices subscribed to the 'posts' topic.
 * Call this when a user creates a new post (e.g. from add-post success handler).
 */
export async function POST(req: Request) {
  try {
    const hasJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
    const hasPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
    if (!hasJson && !hasPath) {
      return NextResponse.json(
        { error: 'Set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_PATH in .env' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const title = typeof body.title === 'string' ? body.title : 'My App';
    const bodyText = typeof body.body === 'string' ? body.body : 'New update';
    const data = body.data && typeof body.data === 'object' ? body.data : undefined;

    const messaging = getAdminMessaging();
    const messageId = await messaging.send({
      topic: 'posts',
      notification: {
        title,
        body: bodyText,
      },
      data: data ?? {},
      webpush: {
        fcmOptions: {
          link: '/dashboard/find-animals',
        },
      },
    });

    return NextResponse.json({ success: true, messageId });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
