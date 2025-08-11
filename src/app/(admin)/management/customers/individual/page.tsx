import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import IndividualCustomersTable from "@/features/customer/individual/components/tables/IndividualCustomersTable";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bireysel Müşteriler" />
      <div>
        <Suspense fallback={<Spinner />}>
          <IndividualCustomersTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
