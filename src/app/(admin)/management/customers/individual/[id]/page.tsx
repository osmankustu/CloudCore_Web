/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import IndividualCustomerCard from "@/features/customer/individual/components/Cards/IndividualCustomerCard";

const page = ({ params }: { params: any }) => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Müşteri Detayı" />
      <div>
        <Suspense fallback={<Spinner />}>
          <IndividualCustomerCard id={params.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
