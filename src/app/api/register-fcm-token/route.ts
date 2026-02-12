import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

async function getDbUserId(): Promise<string | null> {
  const user = await currentUser();
  if (!user) return null;
  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ?? user.emailAddresses[0];
  const email = primaryEmail?.emailAddress?.trim()?.toLowerCase();
  if (!email) return null;
  const dbUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return dbUser?.id ?? null;
}

/**
 * POST /api/register-fcm-token
 * Body: { token: string }
 * Saves the FCM token for the current user so we can send medical reminder push at 12:00.
 */
export async function POST(req: Request) {
  try {
    const userId = await getDbUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const token = typeof body.token === 'string' ? body.token.trim() : '';
    if (!token) {
      return NextResponse.json({ error: 'token required' }, { status: 400 });
    }

    await prisma.fcmToken.upsert({
      where: {
        userId_token: { userId, token },
      },
      create: { userId, token },
      update: { createdAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[register-fcm-token]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    );
  }
}
