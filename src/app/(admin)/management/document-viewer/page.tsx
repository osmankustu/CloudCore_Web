"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import dynamic from "next/dynamic";
const DocumentViewer = dynamic(
  () => import("@/features/document/components/cards/documentViewer"),
  { ssr: false }, // <--- SSR kapalı
);

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle={"Döküman Görüntüleyici"} />
      <div>
        <DocumentViewer />
      </div>
    </div>
  );
};

export default page;
