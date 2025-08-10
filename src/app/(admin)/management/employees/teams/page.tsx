import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Ekipler" />
      <div>
        <Suspense fallback={<Spinner />}>
          {/* teams */}
        </Suspense>
      </div>
    </div>
  );
};

export default page;
