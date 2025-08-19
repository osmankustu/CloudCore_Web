"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserDetailCard from "@/features/business/permissions/components/cards/UserDetailCard";
import React from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return (
    <div>
      <PageBreadcrumb pageTitle="Kullanıcı Yetki Detayı" />
      <div>
        <UserDetailCard id={id} />
      </div>
    </div>
  );
};

export default page;
