// app/account/layout.tsx
"use client";

import { useState } from "react";
import AccountSidebar from "@/features/account/components/custom/accountSidebar";
import AccountMetaCard from "@/features/account/components/cards/AccountMetaCard";
import AccountInformationCard from "@/features/account/components/cards/AccountInformationCard";
import AccountSettingsCard from "@/features/account/components/cards/AuthenticatorSettingsCard";
import ActiveDeviceList from "@/features/account/components/tables/activeDeviceList";
import AccountNotificationSettings from "@/features/account/components/cards/AccountNotificationSettings";

const menuItems = [
  { id: "profile", label: "Hesap Bilgileri" },
  { id: "security", label: "Güvenlik ve Gizlilik" },
  { id: "notifications", label: "Bildirim Ayarları" },
  { id: "sessions", label: "Oturumlar ve Cihazlar" },
];

export default function AccountLayout() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderPanel = () => {
    switch (activeTab) {
      case "profile":
        return <AccountInformationCard />;
      case "security":
        return <AccountSettingsCard />;
      case "notifications":
        return <AccountNotificationSettings />;
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
