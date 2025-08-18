// app/account/layout.tsx
"use client";

import { useState } from "react";
import AccountSidebar from "@/features/account/components/custom/accountSidebar";
import AccountMetaCard from "@/features/account/components/cards/AccountMetaCard";

import ActiveDeviceList from "@/features/account/components/tables/activeDeviceList";

import BillingCard from "@/features/account/components/cards/BillingCard";
import TenantInfoCard from "@/features/business/info/components/cards/tenantInfoCard";

const menuItems = [
  { id: "business", label: "İşletme Bilgileri" },
  { id: "billing", label: "Faturalandırma" },
  { id: "sessions", label: "Oturumlar ve Cihazlar" },
];

export default function BusinessLayout() {
  const [activeTab, setActiveTab] = useState("business");

  const renderPanel = () => {
    switch (activeTab) {
      case "business":
        return <TenantInfoCard />;
      case "billing":
        return <BillingCard />;
      case "sessions":
        return <ActiveDeviceList />;
      default:
        return <div>Panel bulunamadı</div>;
    }
  };

  return (
    <div className="space-y-4 p-6">
      <AccountMetaCard />
      <div className="flex gap-4">
        <AccountSidebar items={menuItems} activeTab={activeTab} onSelect={setActiveTab} />
        <div className="flex-1 rounded-xl bg-white p-4 shadow">{renderPanel()}</div>
      </div>
    </div>
  );
}
