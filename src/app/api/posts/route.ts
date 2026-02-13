import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SESSION_TOKEN = "portfolio_admin_session";

function isAuthenticated(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return !!cookieStore.get(SESSION_TOKEN)?.value;
}

function getPostsPath() {
  return join(process.cwd(), "src/data/posts.json");
}

function readPosts() {
  const data = readFileSync(getPostsPath(), "utf-8");
  return JSON.parse(data);
}

function writePosts(posts: Record<string, unknown>[]) {
  writeFileSync(getPostsPath(), JSON.stringify(posts, null, 2), "utf-8");
}

export async function GET() {
  try {
    const posts = readPosts();
    return NextResponse.json(posts);
  } catch {
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
    const posts = readPosts();

    const newPost = {
      id: Date.now().toString(),
      ...post,
      slug:
        post.slug ||
        post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      date: post.date || new Date().toISOString().split("T")[0],
      published: post.published ?? true,
    };

    posts.push(newPost);
    writePosts(posts);

    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedPost = await request.json();
    const posts = readPosts();

    const index = posts.findIndex(
      (p: Record<string, unknown>) => p.id === updatedPost.id
    );
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    posts[index] = { ...posts[index], ...updatedPost };
    writePosts(posts);

    return NextResponse.json(posts[index]);
  } catch {
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
      return NextResponse.json(
        { error: "Post ID required" },
        { status: 400 }
      );
    }

    const posts = readPosts();
    const filtered = posts.filter(
      (p: Record<string, unknown>) => p.id !== id
    );

    if (filtered.length === posts.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    writePosts(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
