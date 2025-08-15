import Button from "@/components/ui/button/Button";
import TableOffButton from "@/components/ui/button/TableOffButton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const ActiveDeviceList = () => {
  const deviceList = [
    {
      id: "SA-2512C59F-2750",
      device: "iPhone 12",
      ip: "192.168.1.10",
      lastLogin: "2023-10-01 12:30",
      actions: "Oturumu kapat",
    },
    {
      id: "SA-2512C59F-2751",
      device: "Samsung Galaxy S21",
      ip: "192.168.1.11",
      lastLogin: "2023-10-02 14:45",
      actions: "Oturumu kapat",
    },
    {
      id: "SA-2512C59F-2752",
      device: "MacBook Pro",
      ip: "192.168.1.12",
      lastLogin: "2023-10-03 09:15",
      actions: "Oturumu kapat",
    },
  ];

  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
          Oturumlar Ve Cihazlar
        </h4>

        <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 shadow-sm sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
          {/* Başlık */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Aktif Cihaz Listesi
            </h3>
          </div>

          {/* Tablo */}
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-y border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-white/[0.02]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Cihaz
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    IP
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    Son Giriş
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    İşlemler
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {deviceList.map(device => (
                  <TableRow key={device.id}>
                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                      {device.device}
                    </TableCell>
                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                      {device.ip}
                    </TableCell>
                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                      {device.lastLogin}
                    </TableCell>
                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                      <TableOffButton text={"Oturumu kapat"} onClick={() => {}} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveDeviceList;
