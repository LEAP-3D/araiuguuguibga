import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url || !url.trim()) {
    if (typeof process !== "undefined" && process.env.NODE_ENV === "production") {
      console.error("[prisma] DATABASE_URL is missing. Set it in Vercel Environment Variables.");
    }
    return "";
  }
  try {
    const [base, search] = url.split("?");
    const params = new URLSearchParams(search ?? "");
    params.set("sslmode", "verify-full");
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  } catch {
    return url ?? "";
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

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
