/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import IndividualCustomerCard from "@/features/customer/individual/components/Cards/IndividualCustomerCard";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Müşteri Detayı" />
      <div>
        <Suspense fallback={<Spinner />}>
          <IndividualCustomerCard id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
