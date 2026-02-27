/* eslint-disable max-lines */
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

const VALID_TYPES = ['dog', 'cat', 'other'] as const;
const VALID_STATUSES = ['lost', 'found', 'rescued'] as const;
const FOUND_MARKER = '[FOUND]';
const META_START = '[META]';
const META_END = '[/META]';

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

function normalizeStatus(value: unknown): 'lost' | 'found' | 'rescued' {
  const raw = typeof value === 'string' ? value.trim().toLowerCase() : '';
  if (VALID_STATUSES.includes(raw as (typeof VALID_STATUSES)[number])) return raw as 'lost' | 'found' | 'rescued';
  return 'lost';
}

function detectStatusFromText(text: string): 'lost' | 'found' | 'rescued' {
  return text.trim().toUpperCase().startsWith(FOUND_MARKER) ? 'found' : 'lost';
}

function stripStatusMarker(text: string) {
  if (detectStatusFromText(text) === 'found') {
    return text.replace(/^\s*\[FOUND\]\s*/i, '').trim();
  }
  return text;
}

type PostMeta = {
  status?: 'lost' | 'found' | 'rescued';
  breed?: string;
  age?: string;
  type?: 'dog' | 'cat' | 'other';
  contactName?: string;
  contactPhone?: string;
  contactNotes?: string;
};

function encodeMeta(meta: PostMeta, description: string) {
  const compact = JSON.stringify(meta);
  return `${META_START}${compact}${META_END}\n${description}`.trim();
}

function parseMetaFromText(rawText: string) {
  const text = rawText ?? '';
  const start = text.indexOf(META_START);
  const end = text.indexOf(META_END);
  if (start === -1 || end === -1 || end < start) {
    return { meta: {} as PostMeta, description: stripStatusMarker(text).trim() };
  }
  const json = text.slice(start + META_START.length, end).trim();
  const remainder = text.slice(end + META_END.length).trim();
  try {
    const parsed = JSON.parse(json) as PostMeta;
    return {
      meta: parsed ?? {},
      description: stripStatusMarker(remainder).trim(),
    };
  } catch {
    return { meta: {} as PostMeta, description: stripStatusMarker(text).trim() };
  }
}

function isSchemaMismatchError(err: unknown) {
  const msg = err instanceof Error ? err.message.toLowerCase() : '';
  return (
    msg.includes('does not exist in the current database') ||
    (msg.includes('column') && msg.includes('does not exist')) ||
    msg.includes('unknown arg') ||
    msg.includes('unknown argument') ||
    msg.includes('argument `type` is missing') ||
    msg.includes('argument type is missing')
  );
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
    const shouldFilterByType = Boolean(typeParam && VALID_TYPES.includes(typeParam as (typeof VALID_TYPES)[number]));
    const filterType = normalizeType(typeParam ?? '');

    try {
      // Use untyped access to stay compatible with whichever Prisma client/schema is currently generated.
      const posts = await (prisma as unknown as { rescuePost: { findMany: (args: unknown) => Promise<Array<Record<string, unknown>>> } }).rescuePost.findMany({
        orderBy: { createdAt: 'desc' },
      });

      const mapped = posts.map((p) => {
        const noteText = readString(p.note) || readString(p.description);
        const parsed = parseMetaFromText(noteText);
        const status = normalizeStatus(parsed.meta.status ?? p.status ?? detectStatusFromText(noteText));
        const type = normalizeType(parsed.meta.type ?? p.type ?? 'other');
        const images = readStringArray(p.images);
        const fallbackImage = readString(p.image);
        const normalizedImages = images.length > 0 ? images : fallbackImage ? [fallbackImage] : [];
        const createdAtRaw = p.createdAt;
        const createdAt = createdAtRaw instanceof Date ? createdAtRaw.getTime() : Number(new Date(String(createdAtRaw)));

        return {
          status,
          id: readString(p.id),
          name: readString(p.name, 'Нэргүй'),
          breed: readString(p.breed, parsed.meta.breed ?? ''),
          age: readString(p.age, parsed.meta.age ?? ''),
          color: readString(p.color),
          size: readString(p.size, 'medium'),
          note: parsed.description,
          images: normalizedImages,
          type,
          description: parsed.description,
          location: readString(p.location),
          image: normalizedImages[0] ?? '',
          contactName: readString(p.contactName, parsed.meta.contactName ?? ''),
          contactPhone: readString(p.contactPhone, parsed.meta.contactPhone ?? ''),
          contactNotes: readString(p.contactNotes, parsed.meta.contactNotes ?? ''),
          createdAt: Number.isFinite(createdAt) ? createdAt : Date.now(),
        };
      });

      return NextResponse.json(shouldFilterByType ? mapped.filter((p) => p.type === filterType) : mapped);
    } catch (err) {
      if (!isSchemaMismatchError(err)) throw err;

      // Old DB schema fallback: read raw rows and map to the app shape.
      const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>('SELECT * FROM "RescuePost" ORDER BY "createdAt" DESC');
      const mapped = rows.map((row) => {
        const images = readStringArray(row.images);
        const fallbackImage = readString(row.image);
        const normalizedImages = images.length > 0 ? images : fallbackImage ? [fallbackImage] : [];
        const note = readString(row.note) || readString(row.description);
        const parsed = parseMetaFromText(note);
        const type = normalizeType(row.type || parsed.meta.type);
        const status = normalizeStatus(row.status || parsed.meta.status) === 'lost' ? detectStatusFromText(note) : normalizeStatus(row.status || parsed.meta.status);
        const createdAtRaw = row.createdAt;
        const createdAt = createdAtRaw instanceof Date ? createdAtRaw.getTime() : Number(new Date(String(createdAtRaw)));

        return {
          id: readString(row.id),
          status,
          name: readString(row.name, 'Нэргүй'),
          breed: readString(row.breed, parsed.meta.breed ?? ''),
          age: readString(row.age, parsed.meta.age ?? ''),
          color: readString(row.color),
          size: readString(row.size, 'medium'),
          note: parsed.description,
          images: normalizedImages,
          type,
          description: parsed.description,
          location: readString(row.location),
          image: normalizedImages[0] ?? '',
          contactName: readString(row.contactName, parsed.meta.contactName ?? ''),
          contactPhone: readString(row.contactPhone, parsed.meta.contactPhone ?? ''),
          contactNotes: readString(row.contactNotes, parsed.meta.contactNotes ?? ''),
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
    const status = normalizeStatus(body.status);
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const color = typeof body.color === 'string' ? body.color.trim() || null : null;
    const sizeRaw = typeof body.size === 'string' ? body.size.trim().toLowerCase() : 'medium';
    const size = sizeRaw === 'small' || sizeRaw === 'medium' || sizeRaw === 'large' ? sizeRaw : 'medium';
    const note = typeof body.note === 'string' ? body.note.trim() || null : null;
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const breed = typeof body.breed === 'string' ? body.breed.trim() : '';
    const age = typeof body.age === 'string' ? body.age.trim() : '';
    const type = normalizeType(body.type);
    const contactName = typeof body.contactName === 'string' ? body.contactName.trim() : '';
    const contactPhone = typeof body.contactPhone === 'string' ? body.contactPhone.trim() : '';
    const contactNotes = typeof body.contactNotes === 'string' ? body.contactNotes.trim() : '';
    const location = typeof body.location === 'string' ? body.location.trim() || null : null;
    const imagesFromArray = Array.isArray(body.images) ? body.images.filter((img): img is string => typeof img === 'string' && img.trim().length > 0) : [];
    const singleImage = typeof body.image === 'string' && body.image.trim().length > 0 ? body.image.trim() : '';
    const images = (imagesFromArray.length > 0 ? imagesFromArray : singleImage ? [singleImage] : []).slice(0, 10);
    const baseDescription = description || (note ?? '');
    const taggedDescription = status === 'found' ? `${FOUND_MARKER} ${baseDescription}`.trim() : baseDescription;
    const persistedNote = encodeMeta(
      {
        status,
        breed,
        age,
        type,
        contactName,
        contactPhone,
        contactNotes,
      },
      taggedDescription
    );

    try {
      const post = await prisma.rescuePost.create({
        data: {
          userId,
          name: name || 'Нэргүй',
          color,
          size,
          note: persistedNote,
          location,
          images,
        },
      });

      return NextResponse.json({
        id: post.id,
        status,
        name: post.name,
        breed,
        age,
        color: post.color ?? '',
        size: post.size ?? 'medium',
        note: stripStatusMarker(baseDescription),
        images: post.images ?? [],
        type,
        description: stripStatusMarker(baseDescription),
        location: post.location ?? '',
        image: (post.images ?? [])[0] ?? '',
        contactName,
        contactPhone,
        contactNotes,
        createdAt: post.createdAt.getTime(),
      });
    } catch (err) {
      if (!isSchemaMismatchError(err)) throw err;

      // Old DB schema fallback (type/location required, image/description legacy).
      const fallbackId = generateFallbackId();
      const fallbackType = normalizeType(body.type);
      const fallbackStatus = normalizeStatus(body.status);
      const fallbackLocation = location ?? '';
      const fallbackDescription = encodeMeta(
        {
          status,
          breed,
          age,
          type: fallbackType,
          contactName,
          contactPhone,
          contactNotes,
        },
        status === 'found' ? `${FOUND_MARKER} ${baseDescription}`.trim() : baseDescription
      );
      const fallbackImage = (typeof body.image === 'string' ? body.image : images[0] ?? '') || '';

      const fallbackRows = await prisma.$queryRaw<Array<Record<string, unknown>>>`
        INSERT INTO "RescuePost" ("id", "userId", "name", "type", "location", "description", "image", "createdAt")
        VALUES (${fallbackId}, ${userId}, ${name || 'Нэргүй'}, ${fallbackType}, ${fallbackLocation}, ${fallbackDescription}, ${fallbackImage}, NOW())
        RETURNING "id", "name", "location", "description", "image", "createdAt", ${fallbackStatus} as "status"
      `;

      const row = fallbackRows[0] ?? {};
      const createdAtRaw = row.createdAt;
      const createdAt = createdAtRaw instanceof Date ? createdAtRaw.getTime() : Number(new Date(String(createdAtRaw)));

      return NextResponse.json({
        id: readString(row.id, fallbackId),
        status: normalizeStatus(row.status || fallbackStatus),
        name: readString(row.name, name || 'Нэргүй'),
        breed,
        age,
        color: '',
        size: 'medium',
        note: stripStatusMarker(readString(row.description)),
        images: readString(row.image) ? [readString(row.image)] : [],
        type: fallbackType,
        description: stripStatusMarker(readString(row.description)),
        location: readString(row.location, fallbackLocation),
        image: readString(row.image),
        contactName,
        contactPhone,
        contactNotes,
        createdAt: Number.isFinite(createdAt) ? createdAt : Date.now(),
      });
    }
  } catch (err) {
    console.error('[rescue-posts POST]', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
