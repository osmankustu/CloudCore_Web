"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export type ViewerProps = {
  url: string;
  fileType: string;
};

export default function DocumentViewer() {
  const searchParams = useSearchParams();
  const fileType = searchParams?.get("fileType") ?? "";
  const url = searchParams?.get("url") ?? "";

  if (!url && fileType) return <div>Document not selected</div>;

  if (fileType === "application/pdf") {
    return (
      <div style={{ height: "80vh", overflow: "auto" }}>
        <Document file={url}>
          <Page pageNumber={1} />
        </Document>
      </div>
    );
  }

  if (fileType.startsWith("image/")) {
    return <Image src={url} alt="Document" width={100} height={100} />;
  }
}
