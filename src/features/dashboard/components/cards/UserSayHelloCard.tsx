"use client";
import { useUserStore } from "@/features/account/store/useUserStore";
import React from "react";

const UserSayHelloCard = () => {
  const { user } = useUserStore();
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 p-3 lg:p-3 dark:border-gray-800">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                {" Hoşgeldiniz... " + user?.firstName + " " + user?.lastName.toUpperCase()}
              </h4>
            </div>
            <div className="order-2 flex grow items-center gap-2 xl:order-3 xl:justify-end">
              <button
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={() => {}}
              >
                Servis Kaydı Oluştur
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSayHelloCard;
