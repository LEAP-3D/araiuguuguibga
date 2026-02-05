import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const VALID_TYPES = ["dog", "cat", "other"] as const;

async function getDbUserId(): Promise<string | null> {
  const user = await currentUser();
  if (!user) return null;
  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ??
    user.emailAddresses[0];
  const email = primaryEmail?.emailAddress?.trim()?.toLowerCase();
  if (!email) return null;
  const dbUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return dbUser?.id ?? null;
}

/** List rescue posts (public). Query: ?type=dog|cat|other */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type");

    const where =
      typeParam && VALID_TYPES.includes(typeParam as (typeof VALID_TYPES)[number])
        ? { type: typeParam }
        : {};

    const posts = await prisma.rescuePost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        breed: true,
        age: true,
        type: true,
        description: true,
        location: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      posts.map((p) => ({
        id: p.id,
        name: p.name,
        breed: p.breed ?? "",
        age: p.age ?? "",
        type: p.type,
        description: p.description ?? "",
        location: p.location,
        image: p.image ?? "",
        createdAt: typeof p.createdAt.getTime === "function" ? p.createdAt.getTime() : Number(new Date(p.createdAt)),
      }))
    );
  } catch (err) {
    console.error("[rescue-posts GET]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

/** Create rescue post (auth required) */
export async function POST(req: Request) {
  try {
    const userId = await getDbUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const breed = typeof body.breed === "string" ? body.breed.trim() || null : null;
    const age = typeof body.age === "string" ? body.age.trim() || null : null;
    const typeRaw = typeof body.type === "string" ? body.type.trim().toLowerCase() : "";
    const type = VALID_TYPES.includes(typeRaw as (typeof VALID_TYPES)[number]) ? typeRaw : "other";
    const description = typeof body.description === "string" ? body.description.trim() || null : null;
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() || null : null;

    if (!location) {
      return NextResponse.json(
        { error: "location required" },
        { status: 400 }
      );
    }

    const post = await prisma.rescuePost.create({
      data: {
        userId,
        name: name || "Нэргүй",
        breed,
        age,
        type,
        description,
        location,
        image,
      },
    });

    return NextResponse.json({
      id: post.id,
      name: post.name,
      breed: post.breed ?? "",
      age: post.age ?? "",
      type: post.type,
      description: post.description ?? "",
      location: post.location,
      image: post.image ?? "",
      createdAt: post.createdAt.getTime(),
    });
  } catch (err) {
    console.error("[rescue-posts POST]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
