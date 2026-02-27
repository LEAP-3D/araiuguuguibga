import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminMessaging } from '@/lib/firebase-admin';
import { sendVaccineReminderEmailsBatch } from '@/lib/email';

/**
 * GET /api/cron/daily-medical-reminder
 * Call at 12:00 daily (e.g. Vercel Cron). Sends FCM + email to users who have medical records due today.
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
      select: { userId: true, pet: true, type: true, medicine: true, user: { select: { email: true } } },
    });

    if (dueRecords.length === 0) {
      return NextResponse.json({ sent: 0, emailsSent: 0, message: 'No due records today' });
    }

    const userIds = [...new Set(dueRecords.map((r) => r.userId))];
    const byUser = new Map<
      string,
      { records: { pet: string; type: string; medicine: string }[]; email: string }
    >();
    for (const r of dueRecords) {
      const rec = { pet: r.pet, type: r.type, medicine: r.medicine };
      if (!byUser.has(r.userId)) {
        byUser.set(r.userId, { records: [rec], email: r.user.email });
      } else {
        byUser.get(r.userId)!.records.push(rec);
      }
    }

    // 1. FCM push notifications (to devices)
    const tokens = await prisma.fcmToken.findMany({
      where: { userId: { in: userIds } },
      select: { token: true, userId: true },
    });
    let sent = 0;
    if (tokens.length > 0) {
      const messaging = getAdminMessaging();
      for (const { token, userId } of tokens) {
        const { records } = byUser.get(userId) ?? { records: [] };
        if (records.length === 0) continue;
        const title =
          records.length === 1
            ? 'Өнөөдөр эрүүл мэндийн анхааруулга'
            : `${records.length} эрүүл мэндийн анхааруулга`;
        const body = records
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
          console.warn('[daily-medical-reminder] FCM send failed for token', e);
        }
      }
    }

    // 2. Email notifications (batch – one API call to avoid 429)
    const emailItems = Array.from(byUser.entries())
      .filter(([, { records, email }]) => email?.trim() && records.length > 0)
      .map(([, { records, email }]) => ({ to: email!, records }));
    const emailResult = await sendVaccineReminderEmailsBatch(emailItems);
    const emailsSent = emailResult.ok ? emailResult.sent : 0;
    if (!emailResult.ok) console.warn('[daily-medical-reminder] Batch email failed:', emailResult.error);

    return NextResponse.json({ sent, emailsSent, totalDue: dueRecords.length });
  } catch (e) {
    console.error('[daily-medical-reminder]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    );
  }
}
