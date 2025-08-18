"use client";
import React, { useState } from "react";
import PermissionsInfoCard from "./PermissionsInfoCard";
import UsersPermissionsTable from "../tables/UsersPermissionsTable";

export default function PermissionsCard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="mb-4 flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2 ${activeTab === "users" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
        >
          Kullanıcılar
        </button>

        <button
          onClick={() => setActiveTab("permissions")}
          className={`pb-2 ${activeTab === "permissions" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
        >
          İzinler
        </button>
      </div>

      {activeTab === "users" && <UsersPermissionsTable />}
      {activeTab === "permissions" && <PermissionsInfoCard />}
    </div>
  );
}
