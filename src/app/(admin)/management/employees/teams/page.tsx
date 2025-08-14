"use client";
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import TeamsTable from "@/features/team/components/tables/TeamsTable";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Ekipler" />
      <div>
        <Suspense fallback={<Spinner />}>
          <TeamsTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
