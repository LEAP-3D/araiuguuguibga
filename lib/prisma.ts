import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

function getConnectionString(): string {
  let url = process.env.DATABASE_URL;
  if (!url || !url.trim()) {
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
      console.error('[prisma] DATABASE_URL is missing. Set it in Vercel Environment Variables.');
    }
    return '';
  }
  // Strip surrounding single or double quotes which may be present in .env values
  url = url.trim();
  if ((url.startsWith("'") && url.endsWith("'")) || (url.startsWith('"') && url.endsWith('"'))) {
    url = url.slice(1, -1).trim();
  }

  try {
    const [base, search] = url.split('?');
    const params = new URLSearchParams(search ?? '');

    // If sslmode is one of these, advise libpq compatibility to preserve current behavior
    const mode = params.get('sslmode')?.toLowerCase();
    if (mode && ['require', 'prefer', 'verify-ca'].includes(mode)) {
      if (!params.has('uselibpqcompat')) params.set('uselibpqcompat', 'true');
    }

    // Only enforce strict sslmode in production when no sslmode provided
    if (process.env.NODE_ENV === 'production') {
      if (!params.has('sslmode')) params.set('sslmode', 'verify-full');
    }

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  } catch {
    return url ?? '';
  }
}

const adapter = new PrismaPg({
  connectionString: getConnectionString(),
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
