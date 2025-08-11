/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import CorporateCustomerCard from "@/features/customer/corporate/components/cards/CorporateCustomerCard";

const page = ({ params }: any) => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Müşteri Detayı" />
      <div>
        <Suspense fallback={<Spinner />}>
          <CorporateCustomerCard id={params.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
