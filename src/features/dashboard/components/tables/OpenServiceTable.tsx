"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import Button from "@/components/ui/button/Button";
import Pagination from "@/components/tables/Pagination";
import { useDashboardStore } from "../../store/useDashboardStore";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import ServiceStatusTableIndicator from "@/features/service/components/indicators/ServiceStatusTableIndicator";
import PriortyStatusIndicator from "@/features/service/components/indicators/PriortyStatusIndicator";
import { formatDate } from "@/core/utils/formatter/dateFormater";

const OpenServicesTable = () => {
  const router = useRouter();
  const { openServices, fetchOpenServices } = useDashboardStore();
  const { run } = useRequestAction();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(0);
  useEffect(() => {
    run(async () => {
      fetchOpenServices(pageIndex, pageSize);
    });
  }, [pageIndex, pageSize]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Servis Kayıtları
            </h3>
          </div>

          <div className="flex items-center gap-3"></div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Firma
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Servis Açıklaması
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Durum
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Öncelik
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Tarih
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Son Güncelleme
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  İşlemler
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {openServices?.items?.map(rec => (
                <TableRow key={rec.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {rec.recordCode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.customerName}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.serviceDescription}
                  </TableCell>
                  <TableCell className="text-theme-sm py-2 text-gray-500 dark:text-white">
                    <ServiceStatusTableIndicator
                      key={rec.id}
                      id={rec.id}
                      serviceStatus={rec.serviceStatus}
                    />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <PriortyStatusIndicator priorty={rec.priority} key={rec.id} />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(rec.createAt)}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(rec.updateAt)}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <Button
                      key={rec.id}
                      size="sm"
                      onClick={() => router.push("services/" + rec.id)}
                    >
                      Detay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={openServices?.index!}
          pageSize={openServices?.size!}
          items={openServices?.count!}
          pageSizes={[10, 15]}
          totalPages={openServices?.pages!}
          onBack={() => setPageIndex(pageIndex)}
          onChange={value => setPageIndex(value)}
          onChangeSize={value => setPageSize(value)}
          onNext={() => setPageIndex(pageIndex)}
        />
      </div>
    </>
  );
};

export default OpenServicesTable;
