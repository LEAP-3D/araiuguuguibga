import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ??
      user.emailAddresses[0];
    const email = primaryEmail?.emailAddress?.trim()?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, image: true, phone: true, bio: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (err) {
    console.error("[user/me GET]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ??
      user.emailAddresses[0];
    const email = primaryEmail?.emailAddress?.trim()?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() || null : undefined;
    const image = typeof body.image === "string" ? body.image.trim() : undefined;
    const phone = typeof body.phone === "string" ? body.phone.trim() || null : undefined;
    const bio = typeof body.bio === "string" ? body.bio.trim() || null : undefined;

    const updateData: { name?: string | null; image?: string; phone?: string | null; bio?: string | null } = {};
    if (name !== undefined) updateData.name = name;
    if (image !== undefined) updateData.image = image;
    if (phone !== undefined) updateData.phone = phone;
    if (bio !== undefined) updateData.bio = bio;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ ok: true });
    }

    const dbUser = await prisma.user.update({
      where: { email },
      data: updateData,
      select: { id: true, email: true, name: true, image: true, phone: true, bio: true },
    });

    return NextResponse.json(dbUser);
  } catch (err) {
    console.error("[user/me PATCH]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
