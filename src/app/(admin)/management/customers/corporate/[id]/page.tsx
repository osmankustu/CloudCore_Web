"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import CorporateCustomerCard from "@/features/customer/corporate/components/cards/CorporateCustomerCard";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Müşteri Detayı" />
      <div>
        <Suspense fallback={<Spinner />}>
          <CorporateCustomerCard id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
