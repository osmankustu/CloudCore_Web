"use client";
import React, { Suspense } from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Spinner from "@/components/ui/spinner/Spinner";
import TeamCard from "@/features/team/components/cards/TeamCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = ({ params }: any) => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Ekipler" />
      <div>
        <Suspense fallback={<Spinner />}>
          <TeamCard id={params.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
