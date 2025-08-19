"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PermissionsCard from "@/features/business/permissions/components/cards/PermissionsCard";
import React from "react";

const page = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle="Kullanıcı Yetkileri" />
      <div>
        <PermissionsCard />
      </div>
    </div>
  );
};

export default page;
