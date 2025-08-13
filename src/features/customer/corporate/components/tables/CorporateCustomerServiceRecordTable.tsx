"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Pagination from "@/components/tables/Pagination";
import FilterTableButton from "@/components/ui/button/FilterTableButton";
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { PageRequest } from "@/core/models/requests/PageRequest";
import { QueryParserForPageRequest } from "@/core/utils/queryParser";
import { useServiceStore } from "@/features/service/store/useServiceStore";

import { CorporateCustomerModel } from "../../model/corporateCustomer";

const CorporateCustomerServiceRecordTable = ({
  corporateCustomer,
}: {
  corporateCustomer: CorporateCustomerModel;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
  const { services } = useServiceStore();
  const [dynamicQuery] = useState<DynamicQuery>({
    sort: [],
    filter: {
      field: "CompanyId",
      filters: [],
      logic: "and",
      value: `${corporateCustomer.id}`,
      operator: "eq",
      caseSensitive: false,
    },
  });
  const [visible, setVisible] = useState<boolean>(false);
  //const { run } = useRequestAction();

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await GetListByDynamicService(
    //     pageRequest.pageIndex,
    //     pageRequest.pageSize,
    //     dynamicQuery!,
    //   );
    //   setServiceRecords(data);
    // };
    // fetchData();
    // run(async()=>{
    // })
  }, [pageRequest.pageIndex, pageRequest.pageSize, dynamicQuery]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Servis Kayıtları
            </h3>
            <input
              type="text"
              placeholder="Search or type command..."
              className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
            />
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
            {/* <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {serviceRecords?.items.map(record => (
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

      {services ? (
        <>
          <Pagination
            items={services.count}
            pageSize={services.size}
            pageSizes={[20, 50]}
            onChangeSize={size =>
              router.push(
                `/customers/corporate/?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`,
              )
            }
            currentPage={services.index + 1}
            onBack={() =>
              router.push(
                `/customers/corporate/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onChange={page =>
              router.push(
                `/customers/corporate/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onNext={() =>
              router.push(
                `/customers/corporate/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            totalPages={services.pages}
            key={1}
          />
        </>
      ) : null}
    </>
  );
};

export default CorporateCustomerServiceRecordTable;
