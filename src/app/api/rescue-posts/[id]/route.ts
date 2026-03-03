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

type RouteContext = { params: { id: string } | Promise<{ id: string }> };

async function getPostId(ctx: RouteContext): Promise<string> {
  const params = await Promise.resolve(ctx.params);
  return params.id;
}

/** PATCH: Update post status (found | rescued) - owner only */
export async function PATCH(req: Request, ctx: RouteContext) {
  try {
    const userId = await getDbUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = await getPostId(ctx);
    if (!id) return NextResponse.json({ error: 'Post id required' }, { status: 400 });

    const body = await req.json();
    const statusRaw = typeof body.status === 'string' ? body.status.trim().toLowerCase() : '';
    if (statusRaw !== 'found' && statusRaw !== 'rescued' && statusRaw !== 'lost') {
      return NextResponse.json({ error: 'status must be "found", "rescued" or "lost"' }, { status: 400 });
    }

    const existing = await prisma.rescuePost.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const post = await prisma.rescuePost.update({
      where: { id },
      data: { status: statusRaw },
    });

    return NextResponse.json({
      id: post.id,
      status: post.status,
      name: post.name,
      breed: post.breed ?? '',
      age: post.age ?? '',
      type: post.type,
      description: post.description ?? '',
      location: post.location,
      image: post.image ?? '',
      contactName: post.contactName ?? '',
      contactPhone: post.contactPhone ?? '',
      contactNotes: post.contactNotes ?? '',
      createdAt: typeof post.createdAt.getTime === 'function' ? post.createdAt.getTime() : Number(new Date(post.createdAt)),
    });
  } catch (err) {
    console.error('[rescue-posts PATCH]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
