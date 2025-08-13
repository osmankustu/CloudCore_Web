import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import ServicesTable from "@/features/service/components/Tables/ServicesTable";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Servisler" />
      <div>
        <Suspense fallback={<Spinner />}>
          <ServicesTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
