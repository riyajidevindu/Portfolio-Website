import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const SESSION_TOKEN = "portfolio_admin_session";

function isAuthenticated(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return !!cookieStore.get(SESSION_TOKEN)?.value;
}

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile || {});
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json({}, { status: 200 });
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await request.json();
    const profile = await prisma.profile.findFirst();

    let updatedProfile;
    if (profile) {
      updatedProfile = await prisma.profile.update({
        where: { id: profile.id },
        data: updates,
      });
    } else {
      updatedProfile = await prisma.profile.create({
        data: {
          name: updates.name || "Default Name",
          title: updates.title || "Default Title",
          bio: updates.bio || "Default Bio",
          email: updates.email || "test@test.com",
          ...updates,
        },
      });
    }

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("PUT settings error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
