"use client";

import Switch from "@/components/form/switch/Switch";
import { useState } from "react";

export default function NotificationSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="space-y-6 p-6">
      <h5 className="text-lg font-semibold">Bildirim Ayarları</h5>

      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h2 className="text-lg font-medium">E-posta Bildirimleri</h2>
            <p className="text-sm text-gray-500">Yeni gelişmeler e-posta ile gönderilir.</p>
          </div>
          <Switch
            defaultChecked={emailNotifications}
            onChange={(value: boolean) => setEmailNotifications(value)}
            label="E-posta Bildirimleri"
          />
        </div>

        {/* SMS */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h2 className="text-lg font-medium">SMS Bildirimleri</h2>
            <p className="text-sm text-gray-500">Önemli durumlarda SMS gönderilir.</p>
          </div>
          <Switch
            defaultChecked={smsNotifications}
            onChange={(value: boolean) => setSmsNotifications(value)}
            label="SMS Bildirimleri"
          />
        </div>

        {/* Push */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <h2 className="text-lg font-medium">Push Bildirimleri</h2>
            <p className="text-sm text-gray-500">Anlık bildirimler cihazınıza iletilir.</p>
          </div>
          <Switch
            defaultChecked={pushNotifications}
            onChange={(value: boolean) => setPushNotifications(value)}
            label="Push Bildirimleri"
          />
        </div>
      </div>

      <button
        onClick={() => alert("Ayarlar kaydedildi!")}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Kaydet
      </button>
    </div>
  );
}
