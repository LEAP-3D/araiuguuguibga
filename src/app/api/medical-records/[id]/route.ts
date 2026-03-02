import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

async function getDbUserId(): Promise<string | null> {
  const user = await currentUser();
  if (!user) return null;
  const primaryEmail = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ?? user.emailAddresses[0];
  const email = primaryEmail?.emailAddress?.trim()?.toLowerCase();
  if (!email) return null;
  const dbUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return dbUser?.id ?? null;
}

type RouteContext = {
  params: { id: string } | Promise<{ id: string }>;
};

async function getRecordId(ctx: RouteContext): Promise<string> {
  const params = await Promise.resolve(ctx.params);
  return params.id;
}

export async function DELETE(_req: Request, ctx: RouteContext) {
  try {
    const userId = await getDbUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = await getRecordId(ctx);
    if (!id) return NextResponse.json({ error: 'Record id is required' }, { status: 400 });

    const existing = await prisma.medicalRecord.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Medical record not found' }, { status: 404 });
    }

    await prisma.medicalRecord.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[medical-records DELETE]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
