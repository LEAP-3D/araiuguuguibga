import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getAdminMessaging } from '@/lib/firebase-admin';
import prisma from '@/lib/prisma';
import { sendNewPostEmailsBatch } from '@/lib/email';

/**
 * POST /api/notify-new-post
 * Body: { title?: string, body?: string, postName?: string }
 * - Sends FCM push to 'posts' topic (all subscribed devices)
 * - Sends email to ALL users EXCEPT the poster
 */
export async function POST(req: Request) {
  try {
    const poster = await currentUser();
    const primaryEmail = poster?.emailAddresses?.find((e) => e.id === poster.primaryEmailAddressId) ?? poster?.emailAddresses?.[0];
    const _posterEmail = primaryEmail?.emailAddress?.trim()?.toLowerCase() ?? null;
    const posterName = poster?.firstName ?? poster?.fullName ?? (typeof poster?.username === 'string' ? poster.username : undefined);

    const body = await req.json().catch(() => ({}));
    const title = typeof body.title === 'string' ? body.title : 'Шинэ тусламж хэрэгтэй амьтан';
    const bodyText = typeof body.body === 'string' ? body.body : 'Шинэ пост оруулагдлаа';
    const postName = typeof body.postName === 'string' ? body.postName : 'Амьтан';

    // 1. FCM push to 'posts' topic
    let fcmSent = false;
    try {
      const messaging = getAdminMessaging();
      await messaging.send({
        topic: 'posts',
        notification: { title, body: bodyText },
        data: { url: '/dashboard/find-animals' },
        webpush: { fcmOptions: { link: '/dashboard/find-animals' } },
      });
      fcmSent = true;
    } catch (e) {
      console.warn('[notify-new-post] FCM failed:', e);
    }

    // 2. Email to all users (single request: to: [emails] – avoids 429)
    const users = await prisma.user.findMany({ select: { email: true } });
    const emails = users.map((u) => u.email).filter((e): e is string => !!e?.trim());
    const result = await sendNewPostEmailsBatch(emails, postName, posterName);
    const emailsSent = result.ok ? result.sent : 0;
    if (!result.ok) console.warn('[notify-new-post] Batch email failed:', result.error);

    return NextResponse.json({ fcmSent, emailsSent, totalUsers: users.length });
  } catch (e) {
    console.error('[notify-new-post]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    );
  }
}
