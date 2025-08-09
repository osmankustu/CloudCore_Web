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
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { FilterField } from "@/core/models/requests/DynamicQuery";
import { PageRequest } from "@/core/models/requests/PageRequest";
import { formatDate } from "@/core/utils/dateFormater";
import { QueryParserForPageRequest } from "@/core/utils/queryParser";

import { usePersonelStore } from "../../store/usePersonelStore";
import PersonelAddForm from "../forms/PersonelAddForm";
import PersonelStatusIndicator from "../indicators/PersonelStatusIndicator";

const PersonelTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
  const { isOpen, openModal, closeModal } = useModal();
  const [visible, setVisible] = useState<boolean>(false);
  const {
    personels,
    isDynamic,
    dynamicQuery,
    isLoading,
    fetchPersonels,
    setIsDynamic,
    setDynamicQuery,
  } = usePersonelStore();
  const { run } = useRequestAction();
  const filteredFields: FilterField[] = [
    { label: "Adına Göre", value: "FirstName", type: "string" },
    { label: "Soyadına Göre", value: "LastName", type: "string" },
    { label: "Departmana Göre", value: "Department", type: "string" },
    { label: "Pozisyona Göre", value: "JobTitle", type: "string" },
    { label: "E-posta Adresine Göre", value: "Email", type: "string" },
    { label: "İşe Giriş Tarihine Göre", value: "HireDate", type: "date" },
    { label: "Doğum Tarihine Göre", value: "BirthDate", type: "date" },
    { label: "Oluşturma Tarihine Göre", value: "CreateAt", type: "date" },
    { label: "Güncelleme Tarihine Göre", value: "UpdateAt", type: "date" },
    { label: "Silinme Tarihine Göre", value: "DeleteAt", type: "date" },
  ];
  const rowVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };
  const handleChangeSearchBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDynamic(true);
    setDynamicQuery({
      sort: [],
      filter: {
        field: "FirstName,LastName",
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
      fetchPersonels(pageRequest.pageIndex, pageRequest.pageSize);
    });
  }, [pageRequest.pageIndex, pageRequest.pageSize, isDynamic, dynamicQuery]);

  const dropFilter = (status: boolean) => {
    if (status) {
      setDynamicQuery({
        filter: {},
        sort: [],
      });
    }
  };

  return (
    // toDo next time refactoring for queryfilter card data scheme
    <>
      {/* {visible ? (
        <FilteredQueryCard
          data={[]}
          filteredFields={filteredFields}
          clearFilter={(status: boolean) => {
            dropFilter(status);
            setIsDynamic(false);
          }}
          onApply={query => {
            setIsDynamic(true);
            setDynamicQuery(query);
          }}
        />
      ) : null} */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Personeller</h3>
            <input
              type="text"
              placeholder="Personel adı ile ara..."
              onChange={handleChangeSearchBox}
              className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>

          <div className="flex items-center gap-3">
            <FilterTableButton
              text={!visible ? "Filtrele" : "Filtre Arayüzünü Gizle"}
              onClick={() => setVisible(!visible)}
            />
            <TableButton
              text={"Personel Oluştur"}
              onClick={() => {
                openModal();
              }}
            />
          </div>
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
                  Personel Kodu
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Adı-Soyadı
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Pozisyon
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Departman
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
              ) : (
                <motion.tbody
                  key="data"
                  //variants={tableFadeVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="divide-y divide-gray-100 dark:divide-gray-800"
                >
                  {personels?.items.map((personel, index) => (
                    <motion.tr
                      key={personel.id}
                      custom={index}
                      variants={rowVariant}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="divide-y divide-gray-100 transition-all duration-300 dark:divide-gray-800"
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                            {personel.personelCode}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {personel.firstName + " " + personel.lastName}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {personel.jobTitle}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {personel.department}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <PersonelStatusIndicator status={personel.isActive} text={""} />
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(personel.createAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(personel.updateAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <Button
                          key={personel.id}
                          size="sm"
                          onClick={() =>
                            router.push("/management/employees/personels/" + personel.id)
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

      {personels ? (
        <>
          <Pagination
            items={personels.count}
            pageSize={personels.size}
            pageSizes={[20, 50]}
            onChangeSize={(size: number) =>
              router.push(
                `/management/employees/personels?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`,
              )
            }
            currentPage={personels!.index + 1}
            onBack={() =>
              router.push(
                `/management/employees/personels/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onChange={(page: number) =>
              router.push(
                `/management/employees/personels/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onNext={() =>
              router.push(
                `/management/employees/personels/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            totalPages={personels.pages}
            key={1}
          />
        </>
      ) : (
        <></>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[1200px]">
        <PersonelAddForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default PersonelTable;
