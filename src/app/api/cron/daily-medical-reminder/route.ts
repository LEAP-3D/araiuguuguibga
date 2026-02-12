import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminMessaging } from '@/lib/firebase-admin';

/**
 * GET /api/cron/daily-medical-reminder
 * Call at 12:00 daily (e.g. Vercel Cron). Sends FCM to users who have medical records due today.
 * Secured by Authorization: Bearer CRON_SECRET or x-cron-secret header.
 */
function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization');
  const cronSecret = req.headers.get('x-cron-secret');
  const valid = secret && (authHeader === `Bearer ${secret}` || cronSecret === secret);
  if (!valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const today = getTodayStr();
    const dueRecords = await prisma.medicalRecord.findMany({
      where: {
        OR: [{ date: today }, { nextDueDate: today }],
      },
      select: { userId: true, pet: true, type: true, medicine: true },
    });

    if (dueRecords.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No due records today' });
    }

    const userIds = [...new Set(dueRecords.map((r) => r.userId))];
    const tokens = await prisma.fcmToken.findMany({
      where: { userId: { in: userIds } },
      select: { token: true, userId: true },
    });

    if (tokens.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No FCM tokens for users with due records' });
    }

    const messaging = getAdminMessaging();
    const byUser = new Map<string, typeof dueRecords>();
    for (const r of dueRecords) {
      if (!byUser.has(r.userId)) byUser.set(r.userId, []);
      byUser.get(r.userId)!.push(r);
    }

    let sent = 0;
    for (const { token, userId } of tokens) {
      const userRecords = byUser.get(userId) ?? [];
      const title =
        userRecords.length === 1
          ? 'Өнөөдөр эрүүл мэндийн анхааруулга'
          : `${userRecords.length} эрүүл мэндийн анхааруулга`;
      const body = userRecords
        .slice(0, 3)
        .map((r) => `${r.pet}: ${r.type}${r.medicine ? ` — ${r.medicine}` : ''}`)
        .join('; ');
      try {
        await messaging.send({
          token,
          notification: { title, body },
          data: { url: '/profile' },
          webpush: { fcmOptions: { link: '/profile' } },
        });
        sent++;
      } catch (e) {
        console.warn('[daily-medical-reminder] send failed for token', e);
      }
    }

    return NextResponse.json({ sent, totalDue: dueRecords.length });
  } catch (e) {
    console.error('[daily-medical-reminder]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    );
  }
}
