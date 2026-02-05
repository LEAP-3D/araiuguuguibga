import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const primaryEmail = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ?? user.emailAddresses[0];
    const email = primaryEmail?.emailAddress?.trim();
    const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName ?? user.lastName ?? null;
    const image = user.imageUrl ?? "";

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: { class: true },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: name ?? existingUser.name,
          image: image || existingUser.image,
          updatedAt: new Date(),
        },
      });
      return NextResponse.json({
        ok: true,
        message: "User updated",
        userId: existingUser.id,
      });
    }

    const defaultImage = image || "https://api.dicebear.com/7.x/avataaars/svg?seed=user";

    const newClass = await prisma.class.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name ?? email.split("@")[0],
        image: defaultImage,
        password: null,
      },
    });

    await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name ?? email.split("@")[0],
        image: defaultImage,
        password: null,
        classId: newClass.id,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "User created",
    });
  } catch (err) {
    console.error("[create-user]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
