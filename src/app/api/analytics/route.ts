import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { cookies } from "next/headers";

const SESSION_TOKEN = "portfolio_admin_session";

interface VisitRecord {
  date: string;
  page: string;
  referrer: string;
  userAgent: string;
  timestamp: number;
}

function getAnalyticsPath() {
  return join(process.cwd(), "src/data/analytics.json");
}

function readAnalytics(): VisitRecord[] {
  const path = getAnalyticsPath();
  if (!existsSync(path)) {
    writeFileSync(path, "[]", "utf-8");
    return [];
  }
  try {
    const data = readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeAnalytics(data: VisitRecord[]) {
  // Keep last 10,000 records to prevent file from growing too large
  const trimmed = data.slice(-10000);
  writeFileSync(getAnalyticsPath(), JSON.stringify(trimmed, null, 2), "utf-8");
}

// Track a visit
export async function POST(request: Request) {
  try {
    const { page, referrer } = await request.json();
    const analytics = readAnalytics();

    const record: VisitRecord = {
      date: new Date().toISOString().split("T")[0],
      page: page || "/",
      referrer: referrer || "direct",
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: Date.now(),
    };

    analytics.push(record);
    writeAnalytics(analytics);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Get analytics (admin only)
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_TOKEN);

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const analytics = readAnalytics();
    const now = Date.now();
    const dayMs = 86400000;

    // Today's visits
    const today = new Date().toISOString().split("T")[0];
    const todayVisits = analytics.filter((v) => v.date === today).length;

    // Last 7 days
    const last7Days = analytics.filter(
      (v) => now - v.timestamp < 7 * dayMs
    ).length;

    // Last 30 days
    const last30Days = analytics.filter(
      (v) => now - v.timestamp < 30 * dayMs
    ).length;

    // Total
    const totalVisits = analytics.length;

    // Daily breakdown (last 30 days)
    const dailyCounts: Record<string, number> = {};
    analytics
      .filter((v) => now - v.timestamp < 30 * dayMs)
      .forEach((v) => {
        dailyCounts[v.date] = (dailyCounts[v.date] || 0) + 1;
      });

    // Top pages
    const pageCounts: Record<string, number> = {};
    analytics.forEach((v) => {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));

    // Top referrers
    const refCounts: Record<string, number> = {};
    analytics.forEach((v) => {
      refCounts[v.referrer] = (refCounts[v.referrer] || 0) + 1;
    });
    const topReferrers = Object.entries(refCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    return NextResponse.json({
      todayVisits,
      last7Days,
      last30Days,
      totalVisits,
      dailyCounts,
      topPages,
      topReferrers,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
