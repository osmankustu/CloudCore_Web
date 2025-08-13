"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import FilterTableButton from "@/components/ui/button/FilterTableButton";
import TableButton from "@/components/ui/button/TableButton";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { rowVariant } from "@/core/constants/constants.animate";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { PageRequest } from "@/core/models/requests/PageRequest";
import { formatDate } from "@/core/utils/dateFormater";
import { QueryParserForPageRequest } from "@/core/utils/queryParser";

import { useIndividualCustomerStore } from "../../store/useIndividualCustomerStore";
import IndividualCustomerAddForm from "../Forms/IndividualCustomerAddForm";

const IndividualCustomersTable = () => {
  const searchParams = useSearchParams();
  const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
  const { isOpen, openModal, closeModal } = useModal();
  const { run, isLoading } = useRequestAction();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  const {
    individualCustomers,
    fetchIndividualCustomers,
    dynamicQuery,
    isDynamic,
    setDynamicQuery,
    setIsDynamic,
    fetchIndividualOptions,
  } = useIndividualCustomerStore();

  const handleChangeSearchBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDynamic(true);
    setDynamicQuery({
      sort: [],
      filter: {
        field: "FirstName",
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
      fetchIndividualCustomers(pageRequest.pageIndex, pageRequest.pageSize);
    });
  }, [pageRequest.pageIndex, pageRequest.pageSize, isDynamic, dynamicQuery]);

  useEffect(() => {
    run(async () => {
      fetchIndividualOptions();
    });
  }, []);

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

            <input
              type="text"
              name="value"
              placeholder="Müşteri adı ile ara.."
              className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
              onChange={handleChangeSearchBox}
            />
          </div>

          <TableButton
            text={"Müşteri Oluştur"}
            onClick={() => {
              openModal();
            }}
          />
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
                  Müşteri Numarası
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Müşteri Adı-Soyadı
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Mail
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Kayıt Tarihi
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Güncelleme Tarihi
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
                    <TableCell colSpan={6}>
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
              ) : !individualCustomers?.items ? (
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
                          Müşteri bulunamadı. Lütfen filtreleri kontrol edin veya yeni bir müşteri
                          ekleyin.
                        </p>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <motion.tbody
                  key="data"
                  //variants={tableFadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="divide-y divide-gray-100 dark:divide-gray-800"
                >
                  {individualCustomers?.items.map((customer, index) => (
                    <motion.tr
                      key={customer.id}
                      custom={index}
                      variants={rowVariant}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="transition-all duration-300 dark:divide-gray-800"
                    >
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {customer.customerNo}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {customer.firstName + " " + customer.lastName}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {customer.email}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(customer.createAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(customer.updateAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <Button
                          size="sm"
                          onClick={() =>
                            router.push(`/management/customers/individual/${customer.id}`)
                          }
                        >
                          Detay
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
            </AnimatePresence>
          </Table>
        </div>
      </div>

      {individualCustomers ? (
        <>
          <Pagination
            items={individualCustomers.count}
            pageSize={individualCustomers.size}
            pageSizes={[20, 50]}
            onChangeSize={size =>
              router.push(
                `/management/customers/individual/?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`,
              )
            }
            currentPage={individualCustomers.index + 1}
            onBack={() =>
              router.push(
                `/management/customers/individual/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onChange={page =>
              router.push(
                `/management/customers/individual/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onNext={() =>
              router.push(
                `/management/customers/individual/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            totalPages={individualCustomers.pages}
            key={1}
          />
        </>
      ) : null}

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <IndividualCustomerAddForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default IndividualCustomersTable;
