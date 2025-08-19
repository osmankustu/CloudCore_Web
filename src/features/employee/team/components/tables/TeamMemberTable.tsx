import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/core/hooks/useModal";
import PersonelStatusIndicator from "@/features/employee/personel/components/indicators/PersonelStatusIndicator";
import { PersonelModel } from "@/features/employee/personel/model/personel";

import TeamMembersEditForm from "../forms/TeamMembersEditForm";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";
import { FcSearch } from "react-icons/fc";
import { usePermission } from "@/core/hooks/auth/usePermission";

import personelPermissions from "@/features/employee/constants/personelPermission.const";

const TeamMemberTable = ({ data }: { data?: PersonelModel[] }) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const { hasPermission } = usePermission();
  return (
    <>
      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Ekipteki Personeller
            </h3>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                <FcSearch size={25} />
              </span>
              <input
                type="text"
                placeholder="Personel ara..."
                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
              />

              <button className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                <span> ⌘ </span>
                <span> K </span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasPermission(personelPermissions.update) ||
            hasPermission(personelPermissions.allPermissions) ? (
              <CardUpdateButton onClick={openModal} text="Düzenle" />
            ) : null}
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
                  İşlemler
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {data?.map(rec => (
                <TableRow key={rec.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {rec.personelCode}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.firstName + " " + rec.lastName}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.jobTitle}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.department}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <PersonelStatusIndicator status={rec.isActive} text={""} />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <Button
                      key={rec.id}
                      size="sm"
                      onClick={() => router.push("/management/employees/personels/" + rec.id)}
                    >
                      Detay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <TeamMembersEditForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default TeamMemberTable;
