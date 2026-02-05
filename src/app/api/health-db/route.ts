import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/health-db
 * Use this on Vercel to see the real DB error when APIs return 500.
 * Open: https://your-app.vercel.app/api/health-db
 */
export async function GET() {
  const hasDbUrl = Boolean(
    typeof process !== "undefined" && process.env.DATABASE_URL?.trim()
  );

  if (!hasDbUrl) {
    return NextResponse.json(
      {
        ok: false,
        error: "DATABASE_URL is not set in Vercel Environment Variables.",
        hint: "Add DATABASE_URL in Vercel → Project → Settings → Environment Variables.",
      },
      { status: 503 }
    );
  }

  try {
    await prisma.user.findFirst({ select: { id: true } });
    return NextResponse.json({ ok: true, message: "Database connected." });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[health-db]", err);
    return NextResponse.json(
      {
        ok: false,
        error: message,
        ...(process.env.NODE_ENV !== "production" && stack ? { stack } : {}),
      },
      { status: 503 }
    );
  }
}
