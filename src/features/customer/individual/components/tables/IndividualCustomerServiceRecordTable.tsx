"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import FilterTableButton from "@/components/ui/button/TableFilterButton";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { PageRequest } from "@/core/models/requests/PageRequest";
import { QueryParserForPageRequest } from "@/core/utils/formatter/queryParser";

import { IndividualCustomerModel } from "../../model/IndividualCustomer";

const IndividualCustomerServiceRecordTable = ({
  individualCustomer,
}: {
  individualCustomer: IndividualCustomerModel;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
  const [visible, setVisible] = useState<boolean>(false);
  const { run } = useRequestAction();

  useEffect(() => {}, [pageRequest.pageIndex, pageRequest.pageSize]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Müşteri Servis Kayıtları
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <FilterTableButton
              onClick={() => setVisible(!visible)}
              text={!visible ? "Filtre" : "Filtreyi Gizle"}
            />
          </div>
        </div>

        {/* Table  */}
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
                  Müşteri
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
            {/* <TableBody className="divide-y divide-gray-100 dark:divide-gray-800"> */}
            {/* {serviceRecords?.items.map(record => (
                <TableRow key={record.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {record.recordCode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {record.customerName}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {record.serviceDescription}
                  </TableCell>
                  <TableCell className="text-theme-sm py-2 text-gray-500 dark:text-white">
                    <ServiceStatusTableIndicator
                      key={record.id}
                      id={record.id}
                      serviceStatus={record.serviceStatus}
                    />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <PriortyStatusIndicator priorty={record.priority} key={record.id} />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(record.createAt)}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(record.updateAt)}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <Button
                      key={record.id}
                      size="sm"
                      onClick={() => router.push("ServiceRecord/" + record.id)}
                    >
                      Detay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </div>
      </div>

      {/* <Pagination
        items={serviceRecords?.count!}
        pageSize={serviceRecords?.size!}
        pageSizes={[20, 50]}
        onChangeSize={size =>
          router.push(`/customers/corporate/?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`)
        }
        currentPage={serviceRecords?.index! + 1}
        onBack={() =>
          router.push(
            `/customers/corporate/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
          )
        }
        onChange={page =>
          router.push(`/customers/corporate/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`)
        }
        onNext={() =>
          router.push(
            `/customers/corporate/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
          )
        }
        totalPages={serviceRecords?.pages!}
        key={1}
      /> */}
    </>
  );
};

export default IndividualCustomerServiceRecordTable;
