import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getAdminMessaging } from '@/lib/firebase-admin';
import prisma from '@/lib/prisma';
import { sendNewPostEmail } from '@/lib/email';

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
    const posterEmail = primaryEmail?.emailAddress?.trim()?.toLowerCase() ?? null;
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

    // 2. Email to all users (including poster – demo-д poster ч имэйл авна)
    const users = await prisma.user.findMany({
      select: { email: true },
    });

    let emailsSent = 0;
    for (const u of users) {
      if (!u.email?.trim()) continue;
      const result = await sendNewPostEmail(u.email, postName, posterName);
      if (result.ok) emailsSent++;
      else console.warn('[notify-new-post] Email failed for', u.email, result.error);
    }

    return NextResponse.json({ fcmSent, emailsSent, totalUsers: users.length });
  } catch (e) {
    console.error('[notify-new-post]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    );
  }
}
