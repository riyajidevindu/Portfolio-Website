import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const SESSION_TOKEN = "portfolio_admin_session";

export async function POST(request: Request) {
  try {
    const { page, referrer } = await request.json();

    await prisma.analytics.create({
      data: {
        date: new Date().toISOString().split("T")[0],
        page: page || "/",
        referrer: referrer || "direct",
        userAgent: request.headers.get("user-agent") || "unknown",
        timestamp: Date.now(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST analytics error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_TOKEN);

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const dayMs = 86400000;
    
    // We only fetch last 30 days of analytics for dashboard
    const thirtyDaysAgo = now - (30 * dayMs);
    const analytics = await prisma.analytics.findMany({
      where: {
        timestamp: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Today's visits
    const today = new Date().toISOString().split("T")[0];
    const todayVisits = analytics.filter((v) => v.date === today).length;

    // Last 7 days
    const last7Days = analytics.filter(
      (v) => now - v.timestamp < 7 * dayMs
    ).length;

    // Last 30 days
    const last30Days = analytics.length;

    // Total
    const totalVisitsCount = await prisma.analytics.count();

    // Daily breakdown (last 30 days)
    const dailyCounts: Record<string, number> = {};
    analytics.forEach((v) => {
      dailyCounts[v.date] = (dailyCounts[v.date] || 0) + 1;
    });

    // Top pages
    const pageCounts: Record<string, number> = {};
    analytics.forEach((v) => {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));

    // Top referrers
    const refCounts: Record<string, number> = {};
    analytics.forEach((v) => {
      refCounts[v.referrer] = (refCounts[v.referrer] || 0) + 1;
    });
    const topReferrers = Object.entries(refCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    return NextResponse.json({
      todayVisits,
      last7Days,
      last30Days,
      totalVisits: totalVisitsCount,
      dailyCounts,
      topPages,
      topReferrers,
    });
  } catch (error) {
    console.error("GET analytics error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
