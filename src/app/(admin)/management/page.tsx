"use client";
import UserSayHelloCard from "@/features/dashboard/components/cards/UserSayHelloCard";
const OpenServiceLocationsMap = dynamic(
  () => import("@/features/dashboard/components/tables/OpenServiceLocationsMap"),
  { ssr: false },
);
import OpenServicesTable from "@/features/dashboard/components/tables/OpenServiceTable";
import dynamic from "next/dynamic";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <UserSayHelloCard />
        <OpenServiceLocationsMap />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <OpenServicesTable />
      </div>
    </div>
  );
};

export default Dashboard;
