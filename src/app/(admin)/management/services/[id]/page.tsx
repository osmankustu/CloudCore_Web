/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import ServiceCard from "@/features/service/components/Cards/ServiceCard";

const page = async ({ params }: any) => {
  const id = params.id;
  return (
    <div>
      <PageBreadcrumb pageTitle="Servis Detayı" />
      <div>
        <Suspense fallback={<Spinner />}>
          <ServiceCard id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
