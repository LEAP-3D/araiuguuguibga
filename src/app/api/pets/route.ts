import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

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

export async function GET() {
  try {
    const userId = await getDbUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pets = await prisma.pet.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pets);
  } catch (err) {
    console.error("[pets GET]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getDbUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const type = typeof body.type === "string" ? body.type.trim() : "";
    const breed = typeof body.breed === "string" ? body.breed.trim() || null : null;
    const age = typeof body.age === "string" ? body.age.trim() || null : body.age != null ? String(body.age) : null;
    const weight = typeof body.weight === "string" ? body.weight.trim() || null : body.weight != null ? String(body.weight) : null;
    const gender = typeof body.gender === "string" ? body.gender.trim() || null : null;
    const note = typeof body.note === "string" ? body.note.trim() || null : null;
    const allergies = typeof body.allergies === "string" ? body.allergies.trim() || null : null;
    const microchip = typeof body.microchip === "string" ? body.microchip.trim() || null : body.microchip != null ? String(body.microchip) : null;
    const image = typeof body.image === "string" ? body.image.trim() || null : null;

    if (!name || !type) {
      return NextResponse.json(
        { error: "name and type required" },
        { status: 400 }
      );
    }

    const pet = await prisma.pet.create({
      data: {
        userId,
        name,
        type,
        breed,
        age,
        weight,
        gender,
        note,
        allergies,
        microchip,
        image,
      },
    });

    return NextResponse.json(pet);
  } catch (err) {
    console.error("[pets POST]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
