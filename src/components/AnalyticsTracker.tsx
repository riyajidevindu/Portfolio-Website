"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin")) return;

    const trackVisit = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer || "direct",
          }),
        });
      } catch {
        // Silently fail - analytics should not block user experience
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
