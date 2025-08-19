"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import FilterTableButton from "@/components/ui/button/TableFilterButton";
import TableButton from "@/components/ui/button/TableAddButton";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { rowVariant, tableFadeVariant } from "@/core/constants/constants.animate";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { PageRequest } from "@/core/models/requests/PageRequest";
import { formatDate } from "@/core/utils/formatter/dateFormater";
import { QueryParserForPageRequest } from "@/core/utils/formatter/queryParser";

import { useServiceStore } from "../../store/useServiceStore";
import ServiceAddForm from "../Forms/ServiceAddForm";
import PriortyStatusIndicator from "../indicators/PriortyStatusIndicator";
import ServiceStatusTableIndicator from "../indicators/ServiceStatusTableIndicator";
import { FcSearch } from "react-icons/fc";
import { usePermission } from "@/core/hooks/auth/usePermission";
import servicePermissions from "../../constants/servicePermissions.const";

const ServicesTable = () => {
  const searchParams = useSearchParams();
  const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
  const { isOpen, openModal, closeModal } = useModal();
  const { run } = useRequestAction();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const {
    services,
    isDynamic,
    isLoading,
    dynamicQuery,
    setDynamicQuery,
    setIsDynamic,
    fetchServices,
  } = useServiceStore();

  const { hasPermission } = usePermission();

  const handleChangeSearchBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDynamic(true);
    setDynamicQuery({
      sort: [],
      filter: {
        field: "CompanyName",
        operator: "contains",
        logic: "and",
        value: e.target.value,
        caseSensitive: false,
        filters: [],
      },
    });
  };

  useEffect(() => {
    run(async () => {
      await fetchServices(pageRequest.pageIndex, pageRequest.pageSize);
    });
  }, [pageRequest.pageIndex, pageRequest.pageSize, isDynamic, dynamicQuery]);

  return (
    <>
      {/* Hader */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <FilterTableButton
              text={!visible ? "Filtrele" : "Filtre Arayüzünü Gizle"}
              onClick={() => setVisible(!visible)}
            />

            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                <FcSearch size={25} />
              </span>
              <input
                onChange={handleChangeSearchBox}
                type="text"
                placeholder="Firma adına göre ara..."
                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
              />

              <button className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                <span> ⌘ </span>
                <span> K </span>
              </button>
            </div>
          </div>
          {hasPermission(servicePermissions.create) ||
          hasPermission(servicePermissions.allPermissions) ? (
            <TableButton
              text={"Servis Kaydı Oluştur"}
              onClick={() => {
                openModal();
              }}
            />
          ) : null}
        </div>

        {/* Table */}
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

            <AnimatePresence mode="wait">
              {isLoading ? (
                <TableBody key="loading">
                  <TableRow>
                    <TableCell colSpan={10}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center py-10"
                      >
                        <Spinner />
                      </motion.div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : services?.count == 0 ? (
                <TableBody key="data">
                  <TableRow>
                    <TableCell colSpan={10}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-center py-10"
                      >
                        <p className="text-theme-md font-medium text-gray-800 dark:text-white/90">
                          Servis bulunamadı. Lütfen filtreleri kontrol edin veya yeni bir servis
                          ekleyin.
                        </p>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <motion.tbody
                  key="data"
                  variants={tableFadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="divide-y divide-gray-100 dark:divide-gray-800"
                >
                  {services?.items.map((service, index) => (
                    <motion.tr
                      key={service.id}
                      custom={index}
                      variants={rowVariant}
                      initial="hidden"
                      animate="visible"
                      className="divide-y divide-gray-100 transition-all duration-300 dark:divide-gray-800"
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                            {service.recordCode}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {service.customerName}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {service.serviceDescription}
                      </TableCell>
                      <TableCell className="text-theme-sm py-2 text-gray-500 dark:text-white">
                        <ServiceStatusTableIndicator
                          key={service.id}
                          id={service.id}
                          serviceStatus={service.serviceStatus}
                        />
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <PriortyStatusIndicator priorty={service.priority} key={service.id} />
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(service.createAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(service.updateAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <Button
                          key={service.id}
                          size="sm"
                          onClick={() => router.push(`/management/services/${service.id}`)}
                        >
                          Detay
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
              {/* Table Body */}
            </AnimatePresence>
          </Table>
        </div>
      </div>
      {services ? (
        <>
          <Pagination
            items={services!.count}
            pageSize={services!.size}
            pageSizes={[20, 50]}
            onChangeSize={size =>
              router.push(
                `/management/services/?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`,
              )
            }
            currentPage={services!.index + 1}
            onBack={() =>
              router.push(
                `/management/services/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onChange={page =>
              router.push(
                `/management/services/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onNext={() =>
              router.push(
                `/management/services/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            totalPages={services!.pages}
            key={1}
          />
        </>
      ) : null}

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <ServiceAddForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default ServicesTable;
