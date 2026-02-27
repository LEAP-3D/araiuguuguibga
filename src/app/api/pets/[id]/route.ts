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

async function getPetId(ctx: RouteContext): Promise<string> {
  const params = await Promise.resolve(ctx.params);
  return params.id;
}

export async function PATCH(req: Request, ctx: RouteContext) {
  try {
    const userId = await getDbUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = await getPetId(ctx);
    if (!id) return NextResponse.json({ error: 'Pet id is required' }, { status: 400 });

    const existing = await prisma.pet.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const type = typeof body.type === 'string' ? body.type.trim() : '';
    const breed = typeof body.breed === 'string' ? body.breed.trim() || null : null;
    const age = typeof body.age === 'string' ? body.age.trim() || null : body.age !== null && body.age !== undefined ? String(body.age) : null;
    const weight = typeof body.weight === 'string' ? body.weight.trim() || null : body.weight !== null && body.weight !== undefined ? String(body.weight) : null;
    const gender = typeof body.gender === 'string' ? body.gender.trim() || null : null;
    const note = typeof body.note === 'string' ? body.note.trim() || null : null;
    const allergies = typeof body.allergies === 'string' ? body.allergies.trim() || null : null;
    const image = typeof body.image === 'string' ? body.image.trim() || null : null;

    if (!name || !type) {
      return NextResponse.json({ error: 'name and type required' }, { status: 400 });
    }

    const updated = await prisma.pet.update({
      where: { id },
      data: {
        name,
        type,
        breed,
        age,
        weight,
        gender,
        note,
        allergies,
        image,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[pets PATCH]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: RouteContext) {
  try {
    const userId = await getDbUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const id = await getPetId(ctx);
    if (!id) return NextResponse.json({ error: 'Pet id is required' }, { status: 400 });

    const existing = await prisma.pet.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    await prisma.pet.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[pets DELETE]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
