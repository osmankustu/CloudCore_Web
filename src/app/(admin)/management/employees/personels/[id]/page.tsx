"use client";
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import PersonelCard from "@/features/employee/personel/components/cards/PersonelCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Personel Bilgileri" />
      <div>
        <Suspense fallback={<Spinner />}>
          <PersonelCard personelId={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
