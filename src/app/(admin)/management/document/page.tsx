"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/ui/spinner/Spinner";
const DocumentViewer = dynamic(
  () => import("@/features/document/components/cards/documentViewer"),
  {
    ssr: false,
  },
);

const page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <div>
        <PageBreadcrumb pageTitle={"Döküman Görüntüleyici"} />
        <div>
          <DocumentViewer />
        </div>
      </div>
    </Suspense>
  );
};

export default page;
