/* eslint-disable max-lines */
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

const VALID_TYPES = ['dog', 'cat', 'other'] as const;

function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string' && v.length > 0);
}

function normalizeType(value: unknown): 'dog' | 'cat' | 'other' {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (VALID_TYPES.includes(raw as (typeof VALID_TYPES)[number])) return raw as 'dog' | 'cat' | 'other';
  return 'other';
}

function isMissingColumnError(err: unknown) {
  const msg = err instanceof Error ? err.message.toLowerCase() : '';
  return msg.includes('does not exist in the current database') || (msg.includes('column') && msg.includes('does not exist'));
}

function generateFallbackId() {
  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

async function getDbUserId(): Promise<string | null> {
  const user = await currentUser();
  if (!user) return null;
  const primaryEmail = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ?? user.emailAddresses[0];
  const email = primaryEmail?.emailAddress?.trim()?.toLowerCase();
  if (!email) return null;
  const dbUser = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  return dbUser?.id ?? null;
}

/** List rescue posts (public). Query: ?type=dog|cat|other */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get('type');
    const filterType = normalizeType(typeParam ?? '');

    try {
      const where = typeParam && VALID_TYPES.includes(typeParam as (typeof VALID_TYPES)[number]) ? { type: typeParam } : {};
      const posts = await prisma.rescuePost.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          color: true,
          size: true,
          note: true,
          images: true,
          location: true,
          createdAt: true,
        },
      });

      return NextResponse.json(
        posts.map((p) => ({
          id: p.id,
          name: p.name,
          color: p.color ?? '',
          size: p.size ?? 'medium',
          note: p.note ?? '',
          images: p.images ?? [],
          type: 'other',
          description: p.note ?? '',
          location: p.location ?? '',
          image: (p.images ?? [])[0] ?? '',
          contactName: '',
          contactPhone: '',
          contactNotes: '',
          createdAt: p.createdAt.getTime(),
        }))
      );
    } catch (err) {
      if (!isMissingColumnError(err)) throw err;

      // Old DB schema fallback: read raw rows and map to the app shape.
      const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>('SELECT * FROM "RescuePost" ORDER BY "createdAt" DESC');
      const mapped = rows.map((row) => {
        const images = readStringArray(row.images);
        const fallbackImage = readString(row.image);
        const normalizedImages = images.length > 0 ? images : fallbackImage ? [fallbackImage] : [];
        const note = readString(row.note) || readString(row.description);
        const type = normalizeType(row.type);
        const createdAtRaw = row.createdAt;
        const createdAt = createdAtRaw instanceof Date ? createdAtRaw.getTime() : Number(new Date(String(createdAtRaw)));

        return {
          id: readString(row.id),
          name: readString(row.name, 'Нэргүй'),
          color: readString(row.color),
          size: readString(row.size, 'medium'),
          note,
          images: normalizedImages,
          type,
          description: note,
          location: readString(row.location),
          image: normalizedImages[0] ?? '',
          contactName: readString(row.contactName),
          contactPhone: readString(row.contactPhone),
          contactNotes: readString(row.contactNotes),
          createdAt: Number.isFinite(createdAt) ? createdAt : Date.now(),
        };
      });

      if (typeParam && VALID_TYPES.includes(typeParam as (typeof VALID_TYPES)[number])) {
        return NextResponse.json(mapped.filter((p) => p.type === filterType));
      }
      return NextResponse.json(mapped);
    }
  } catch (err) {
    console.error('[rescue-posts GET]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

/** Create rescue post (auth required) */
export async function POST(req: Request) {
  try {
    const userId = await getDbUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const color = typeof body.color === 'string' ? body.color.trim() || null : null;
    const sizeRaw = typeof body.size === 'string' ? body.size.trim().toLowerCase() : 'medium';
    const size = sizeRaw === 'small' || sizeRaw === 'medium' || sizeRaw === 'large' ? sizeRaw : 'medium';
    const note = typeof body.note === 'string' ? body.note.trim() || null : null;
    const location = typeof body.location === 'string' ? body.location.trim() || null : null;
    const images = Array.isArray(body.images) ? body.images.filter((img): img is string => typeof img === 'string' && img.trim().length > 0).slice(0, 10) : [];

    try {
      const post = await prisma.rescuePost.create({
        data: {
          userId,
          name: name || 'Нэргүй',
          color,
          size,
          note,
          location,
          images,
        },
      });

      return NextResponse.json({
        id: post.id,
        name: post.name,
        color: post.color ?? '',
        size: post.size ?? 'medium',
        note: post.note ?? '',
        images: post.images ?? [],
        type: 'other',
        description: post.note ?? '',
        location: post.location ?? '',
        image: (post.images ?? [])[0] ?? '',
        contactName: '',
        contactPhone: '',
        contactNotes: '',
        createdAt: post.createdAt.getTime(),
      });
    } catch (err) {
      if (!isMissingColumnError(err)) throw err;

      // Old DB schema fallback (type/location required, image/description legacy).
      const fallbackId = generateFallbackId();
      const fallbackType = normalizeType(body.type);
      const fallbackLocation = location ?? '';
      const fallbackDescription = (typeof body.description === 'string' ? body.description : note ?? '') || '';
      const fallbackImage = (typeof body.image === 'string' ? body.image : images[0] ?? '') || '';

      const fallbackRows = await prisma.$queryRaw<Array<Record<string, unknown>>>`
        INSERT INTO "RescuePost" ("id", "userId", "name", "type", "location", "description", "image", "createdAt")
        VALUES (${fallbackId}, ${userId}, ${name || 'Нэргүй'}, ${fallbackType}, ${fallbackLocation}, ${fallbackDescription}, ${fallbackImage}, NOW())
        RETURNING "id", "name", "location", "description", "image", "createdAt"
      `;

      const row = fallbackRows[0] ?? {};
      const createdAtRaw = row.createdAt;
      const createdAt = createdAtRaw instanceof Date ? createdAtRaw.getTime() : Number(new Date(String(createdAtRaw)));

      return NextResponse.json({
        id: readString(row.id, fallbackId),
        name: readString(row.name, name || 'Нэргүй'),
        color: '',
        size: 'medium',
        note: readString(row.description),
        images: readString(row.image) ? [readString(row.image)] : [],
        type: fallbackType,
        description: readString(row.description),
        location: readString(row.location, fallbackLocation),
        image: readString(row.image),
        contactName: '',
        contactPhone: '',
        contactNotes: '',
        createdAt: Number.isFinite(createdAt) ? createdAt : Date.now(),
      });
    }
  } catch (err) {
    console.error('[rescue-posts POST]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
