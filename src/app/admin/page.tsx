"use client";

import { useState, useEffect } from "react";
import { BarChart3, Eye, TrendingUp, Globe, FileText } from "lucide-react";

interface Analytics {
  todayVisits: number;
  last7Days: number;
  last30Days: number;
  totalVisits: number;
  dailyCounts: Record<string, number>;
  topPages: { page: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, postsRes] = await Promise.all([
        fetch("/api/analytics"),
        fetch("/api/posts"),
      ]);

      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setAnalytics(data);
      }

      if (postsRes.ok) {
        const posts = await postsRes.json();
        setPostsCount(posts.length);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  };

  const stats = [
    {
      label: "Today",
      value: analytics?.todayVisits ?? 0,
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Last 7 Days",
      value: analytics?.last7Days ?? 0,
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      label: "Last 30 Days",
      value: analytics?.last30Days ?? 0,
      icon: BarChart3,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
    },
    {
      label: "Total Visits",
      value: analytics?.totalVisits ?? 0,
      icon: Globe,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
    },
  ];

  return (
    <div className="pt-8 lg:pt-0">
      <h1 className="mb-8 text-2xl font-bold">
        <span className="gradient-text">Dashboard</span>
      </h1>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-2xl p-6 transition-all duration-300 hover:bg-card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${stat.bgColor} ${stat.color}`}>
                <stat.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Pages */}
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-semibold">Top Pages</h2>
          <div className="space-y-3">
            {analytics?.topPages && analytics.topPages.length > 0 ? (
              analytics.topPages.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg p-2 text-sm hover:bg-white/[0.02]"
                >
                  <span className="text-foreground/60">{item.page}</span>
                  <span className="font-medium text-primary">
                    {item.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-foreground/30">
                No data yet. Visits will be tracked automatically.
              </p>
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-4 text-lg font-semibold">Quick Info</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg p-3 hover:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <FileText size={16} />
                </div>
                <span className="text-sm text-foreground/60">
                  Total Posts
                </span>
              </div>
              <span className="text-lg font-bold">{postsCount}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg p-3 hover:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
                  <Globe size={16} />
                </div>
                <span className="text-sm text-foreground/60">
                  Top Referrers
                </span>
              </div>
              <span className="text-sm font-medium text-foreground/60">
                {analytics?.topReferrers?.[0]?.referrer || "N/A"}
              </span>
            </div>
          </div>

          {/* Daily chart placeholder */}
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium text-foreground/50">
              Daily Visits (Last 7 Days)
            </h3>
            <div className="flex h-24 items-end gap-1">
              {Array.from({ length: 7 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - 6 + i);
                const dateStr = date.toISOString().split("T")[0];
                const count = analytics?.dailyCounts?.[dateStr] || 0;
                const maxCount = Math.max(
                  1,
                  ...Object.values(analytics?.dailyCounts || { "": 1 })
                );
                const height = Math.max(4, (count / maxCount) * 100);

                return (
                  <div
                    key={i}
                    className="group relative flex-1 cursor-pointer"
                  >
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-primary/30 to-primary/60 transition-all duration-300 hover:from-primary/50 hover:to-primary/80"
                      style={{ height: `${height}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block">
                      <div className="rounded bg-foreground/90 px-2 py-1 text-[10px] text-background whitespace-nowrap">
                        {count} visits
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-foreground/30">
              <span>7d ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
