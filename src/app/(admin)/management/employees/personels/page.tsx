"use client";
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import PersonelTable from "@/features/personel/components/tables/PersonelTable";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Personeller" />
      <div>
        <Suspense fallback={<Spinner />}>
          <PersonelTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
