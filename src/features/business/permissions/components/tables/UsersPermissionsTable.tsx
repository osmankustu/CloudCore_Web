"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Spinner from "@/components/ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { rowVariant } from "@/core/constants/constants.animate";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { FcSearch } from "react-icons/fc";
import { usePermission } from "@/core/hooks/auth/usePermission";
import Badge from "@/components/ui/badge/Badge";
import { Role } from "../../model/operationClaim";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import PermissionUpdateForm from "../forms/PermissionAddForm";
import { useUserOperationClaimStore } from "../../store/useUserOperationClaimStore";
import { useRouter } from "next/navigation";
import TableOffButton from "@/components/ui/button/TableOffButton";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";

const roleLabels: Record<string, string> = {
  "tenant.admin": "Admin (Tam Erişim)",
  "service.*": "Servis Tam Erişim",
  "customer.*": "Müşteri Tam Erişim",
  "personel.*": "Personel Tam Erişim",
  "jobs.*": "İş Tam Erişim",
  "activity.*": "Aktivite Tam Erişim",

  "service.read": "Servis Görüntüleme",
  "service.write": "Servis Güncelleme",
  "service.create": "Servis Ekleme",
};

const UsersPermissionsTable = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const { run } = useRequestAction();
  const { isLoading, fetchUsers, Users } = useUserOperationClaimStore();
  const router = useRouter();

  useEffect(() => {
    run(async () => {
      fetchUsers();
    });
  }, []);

  function mapRolesFromApi(claims: Role[]): Role[] {
    return claims?.map((r, i) => ({
      id: r.id,
      name: r.name,
      label: roleLabels[r.name.toLocaleLowerCase()] ?? r.name, // eşleşmezse fallback raw name
    }));
  }

  const handleBlock = () => {
    showSuccess("Erişim Engeli Aktive edildi.");
  };

  return (
    // toDo next time refactoring for queryfilter card data scheme
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                <FcSearch size={25} />
              </span>
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
              />

              <button className="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                <span> ⌘ </span>
                <span> K </span>
              </button>
            </div>
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
                  ****
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
                  İzinler
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
              ) : Users?.items.length === 0 ? (
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
                          Kullanıcı bulunamadı. Lütfen filtreleri kontrol edin veya yeni bir
                          personel ekleyin.
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
                  {Users?.items.map((user, index) => (
                    <motion.tr
                      key={user.id}
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
                            {index + 1}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {user.firstName + " " + user.lastName}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {mapRolesFromApi(user.roles).map((role, index) => {
                          return (
                            <Badge key={index} color="success">
                              {role.label}
                            </Badge>
                          );
                        })}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <div className="flex flex-1 gap-2">
                          <Button
                            size="sm"
                            children={"Detay"}
                            onClick={() => {
                              router.push("/management/business/permissions/" + user.id);
                            }}
                          />
                          <TableOffButton text="Erişimi Kısıtla" onClick={openModal} />
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
            </AnimatePresence>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pr-14 text-center">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Erişimi engellemek istediğinizden emin misiniz ?
              </h4>
              <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
                Engellemek için onayla butonuna basınız.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mt-6 flex items-center gap-3 px-2 lg:justify-center">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  İptal
                </Button>
                <Button size="sm" onClick={handleBlock} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <SmoothSpinner />
                      <span>Kaydediliyor...</span>
                    </div>
                  ) : (
                    "Onayla"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Modal>
    </>
  );
};

export default UsersPermissionsTable;
