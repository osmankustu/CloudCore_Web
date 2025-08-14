"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function DocumentViewer() {
  const searchParams = useSearchParams();
  const fileType = String(searchParams?.get("fileType") ?? "");
  const url = decodeURIComponent(String(searchParams?.get("url") ?? ""));

  if (!url && fileType) return <div>Document not selected</div>;

  if (fileType === "application/pdf") {
    return (
      <div style={{ height: "100vh", overflow: "auto" }}>
        <iframe src={url} style={{ width: "100%", height: "100%" }}></iframe>
      </div>
    );
  }

  if (fileType.startsWith("image/")) {
    return <Image src={url} alt="Document" width={100} height={100} />;
  }
}
