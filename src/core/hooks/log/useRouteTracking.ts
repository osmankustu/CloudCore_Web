"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { appLogger } from "@/core/utils/logger/logger";

export const useRouteTracking = (userId?: string) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Her path değiştiğinde çalışır
    const fullUrl = `${pathname}${searchParams?.toString() ? "?" + searchParams.toString() : ""}`;

    appLogger.log(
      "info",
      "PageViewed",
      { event: pathname || "" },
      {
        url: fullUrl,
        userId,
        referrer: document.referrer,
      },
    );
  }, [pathname, searchParams, userId]);
};
