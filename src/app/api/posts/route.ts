import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const SESSION_TOKEN = "portfolio_admin_session";

function isAuthenticated(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return !!cookieStore.get(SESSION_TOKEN)?.value;
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET posts error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await request.json();
    const slug =
      post.slug ||
      post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        slug,
        excerpt: post.excerpt || "",
        content: post.content || "",
        published: post.published ?? true,
        tags: Array.isArray(post.tags) ? post.tags.join(",") : (post.tags || ""),
        publishedAt: post.published ? new Date() : null,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("POST posts error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...updatedPost } = await request.json();
    
    if (!id) {
       return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }

    const tags = Array.isArray(updatedPost.tags) 
        ? updatedPost.tags.join(",") 
        : updatedPost.tags;

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...updatedPost,
        ...(tags !== undefined && { tags }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT posts error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID required" }, { status: 400 });
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE posts error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
