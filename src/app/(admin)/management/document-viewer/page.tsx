"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DocumentViewer from "@/features/document/components/cards/documentViewer";

const page = ({ params }: any) => {
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
