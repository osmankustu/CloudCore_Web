"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import FilterTableButton from "@/components/ui/button/FilterTableButton";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { rowVariant, tableFadeVariant } from "@/core/constants/constants.animate";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { PageRequest } from "@/core/models/requests/PageRequest";
import { formatDate } from "@/core/utils/dateFormater";
import { QueryParserForPageRequest } from "@/core/utils/queryParser";

import { useTeamStore } from "../../store/useTeamStore";
import TeamAddForm from "../forms/TeamAddForm";
import TeamStatusIndicator from "../Indicators/TeamStatusIndicator";

const TeamsTable = () => {
  const searchParams = useSearchParams();
  const pageRequest: PageRequest = QueryParserForPageRequest(searchParams!);
  const { isOpen, openModal, closeModal } = useModal();
  const { run } = useRequestAction();
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const {
    teams,
    isDynamic,
    isLoading,
    dynamicQuery,
    fetchTeams,
    fetchTeamOptions,
    setIsDynamic,
    setDynamicQuery,
  } = useTeamStore();

  const handleChangeSearchBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDynamic(true);
    setDynamicQuery({
      sort: [],
      filter: {
        field: "Name",
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
      fetchTeams(pageRequest.pageIndex, pageRequest.pageSize);
    });
  }, [pageRequest.pageIndex, pageRequest.pageSize, isDynamic, dynamicQuery]);

  useEffect(() => {
    run(async () => {
      fetchTeamOptions();
    });
  }, []);

  return (
    <>
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
              placeholder="Ekip adı ile ara.."
              className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
              onChange={handleChangeSearchBox}
            />
          </div>

          <button
            className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            onClick={openModal}
          >
            Ekip Ekle
          </button>
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
                  Ekip Kodu
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Ekip Adı
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Personel Sayısı
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Ekip Durumu
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
              ) : !teams?.items ? (
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
                          Ekip bulunamadı. Lütfen filtreleri kontrol edin veya yeni bir ekip
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
                  {teams?.items.map((team, index) => (
                    <motion.tr
                      key={team.id}
                      custom={index}
                      variants={rowVariant}
                      initial="hidden"
                      animate="visible"
                      className="divide-y divide-gray-100 transition-all duration-300 dark:divide-gray-800"
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                            {team.teamCode}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {team.name}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {team.personelCount}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <TeamStatusIndicator status={team.isActive} />
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(team.createAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(team.updateAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <Button
                          key={team.id}
                          size="sm"
                          onClick={() => router.push("/management/employees/teams/" + team.id)}
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

      {teams ? (
        <>
          <Pagination
            items={teams.count}
            pageSize={teams.size}
            pageSizes={[20, 50]}
            onChangeSize={(size: number) =>
              router.push(
                `/management/employees/teams?pageIndex=${pageRequest.pageIndex}&pageSize=${size}`,
              )
            }
            currentPage={teams!.index + 1}
            onBack={() =>
              router.push(
                `/management/employees/teams/?pageIndex=${pageRequest.pageIndex - 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onChange={(page: number) =>
              router.push(
                `/management/employees/teams/?pageIndex=${page}&pageSize=${pageRequest.pageSize}`,
              )
            }
            onNext={() =>
              router.push(
                `/management/employees/teams/?pageIndex=${pageRequest.pageIndex + 1}&pageSize=${pageRequest.pageSize}`,
              )
            }
            totalPages={teams.pages}
            key={1}
          />
        </>
      ) : (
        <></>
      )}

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <TeamAddForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default TeamsTable;
