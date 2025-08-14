"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import DocumentViewer from "@/features/document/components/cards/documentViewer";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle={"Döküman Görüntüleyici"} />
      <div>
        <Suspense fallback={<Spinner />}>
          <DocumentViewer />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
