import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import CorporateCustomerTable from "@/features/customer/corporate/components/tables/CorporateCustomerTable";
import IndividualCustomersTable from "@/features/customer/individual/components/IndividualCustomersTable";

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
