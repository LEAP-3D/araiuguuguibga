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

    const records = await prisma.medicalRecord.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(records);
  } catch (err) {
    console.error("[medical-records GET]", err);
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
    const pet = typeof body.pet === "string" ? body.pet.trim() : "";
    const type = typeof body.type === "string" ? body.type.trim() : "";
    const medicine = typeof body.medicine === "string" ? body.medicine.trim() : "";
    const date = typeof body.date === "string" ? body.date.trim() : "";
    const vet = typeof body.vet === "string" ? body.vet.trim() || null : null;
    const note = typeof body.note === "string" ? body.note.trim() || null : null;
    const nextDueDate =
      typeof body.nextDueDate === "string" ? body.nextDueDate.trim() || null : null;

    if (!pet || !type || !medicine || !date) {
      return NextResponse.json(
        { error: "pet, type, medicine, date required" },
        { status: 400 }
      );
    }

    const record = await prisma.medicalRecord.create({
      data: {
        userId,
        pet,
        type,
        medicine,
        date,
        vet,
        note,
        nextDueDate,
      },
    });

    return NextResponse.json(record);
  } catch (err) {
    console.error("[medical-records POST]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
