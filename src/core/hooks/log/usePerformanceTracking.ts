import { appLogger } from "@/core/utils/logger/logger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const usePerformanceTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Navigation timing
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (nav) {
      appLogger.log(
        "info",
        "NavigationTiming",
        { event: "page-performance" },
        {
          dnsLookup: nav.domainLookupEnd - nav.domainLookupStart,
          tcpHandshake: nav.connectEnd - nav.connectStart,
          ttfb: nav.responseStart - nav.requestStart,
          responseTime: nav.responseEnd - nav.responseStart,
          domLoad: nav.domContentLoadedEventEnd - nav.startTime,
          totalLoadTime: nav.loadEventEnd - nav.startTime,
        },
      );
    }

    // Resource timing (örnek: en yavaş 5 request)
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const slowest = resources
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5)
      .map(r => ({
        name: r.name,
        duration: r.duration,
        initiatorType: r.initiatorType,
      }));

    appLogger.log("info", "ResourceTiming", { event: "resource-performance" }, { slowest });

    // Cleanup: performance.clearResourceTimings();
  }, [pathname]);
};
