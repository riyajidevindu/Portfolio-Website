import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const SESSION_TOKEN = "portfolio_admin_session";

function isAuthenticated(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return !!cookieStore.get(SESSION_TOKEN)?.value;
}

export async function GET() {
  try {
    const rawProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    
    const projects = rawProjects.map((p) => ({
      ...p,
      tags: p.tags ? p.tags.split(",") : [],
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET projects error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = await request.json();

    const newProject = await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || null,
        projectUrl: project.projectUrl || null,
        githubUrl: project.githubUrl || null,
        featured: project.featured ?? false,
        tags: Array.isArray(project.tags) ? project.tags.join(",") : (project.tags || ""),
        order: project.order || 0,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST projects error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  if (!isAuthenticated(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...updatedProject } = await request.json();
    
    if (!id) {
       return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const tags = Array.isArray(updatedProject.tags) 
        ? updatedProject.tags.join(",") 
        : updatedProject.tags;

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...updatedProject,
        ...(tags !== undefined && { tags }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT projects error:", error);
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
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE projects error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
