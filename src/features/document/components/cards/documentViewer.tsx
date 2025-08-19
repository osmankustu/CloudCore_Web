"use client";
import Spinner from "@/components/ui/spinner/Spinner";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function DocumentViewer() {
  const searchParams = useSearchParams();
  const fileType = String(searchParams?.get("fileType") ?? "xx");
  const url = decodeURIComponent(String(searchParams?.get("url") ?? "xx"));

  if (fileType === "application/pdf") {
    return (
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <div style={{ height: "100vh", overflow: "auto" }}>
          <iframe src={url} style={{ width: "100%", height: "100%" }}></iframe>
        </div>
      </Suspense>
    );
  }

  if (fileType.startsWith("image/")) {
    return (
      <Suspense fallback={<Spinner />}>
        <div className="items-center">
          <Image src={url} alt="Document" width={800} height={600} />
        </div>
      </Suspense>
    );
  }
}
