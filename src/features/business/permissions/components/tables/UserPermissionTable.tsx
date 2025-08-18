"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Spinner from "@/components/ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { rowVariant, tableFadeVariant } from "@/core/constants/constants.animate";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { FcSearch } from "react-icons/fc";
import { Modal } from "@/components/ui/modal";
import { useUserOperationClaimStore } from "../../store/useUserOperationClaimStore";
import { useRouter } from "next/navigation";
import CardDeleteButton from "@/components/ui/button/CardDeleteButton";
import { formatDate } from "@/core/utils/formatter/dateFormater";
import { deleteUserClaims } from "../../service/userOperationClaimService";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import PermissionAddForm from "../forms/PermissionAddForm";

const UserPermissionTable = ({ id }: { id: string }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const { run } = useRequestAction();
  const { isLoading, UserRoles, fetchUserRoles } = useUserOperationClaimStore();

  useEffect(() => {
    run(async () => {
      fetchUserRoles(id);
    });
  }, []);

  const handleDelete = async (operationClaimId: string) => {
    run(async () => {
      const res = await deleteUserClaims(operationClaimId);
      if (res?.status === 200) {
        showSuccess("Yetki Silindi.");
        fetchUserRoles(id);
      }
    });
  };

  return (
    // toDo next time refactoring for queryfilter card data scheme
    <>
      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                <FcSearch size={25} />
              </span>
              <input
                type="text"
                placeholder="Rol ara..."
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
                  İzinler
                </TableCell>

                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Prefix
                </TableCell>

                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Oluşturma Tarihi
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
              ) : UserRoles?.items?.length == 0 ? (
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
                          Yetki bulunamadı. Lütfen yeni bir yetki ekleyin.
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
                  {UserRoles?.items?.map((role, index) => (
                    <motion.tr
                      key={role.id}
                      custom={index}
                      variants={rowVariant}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="divide-y divide-gray-100 transition-all duration-300 dark:divide-gray-800"
                    >
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {role.label}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {role.name}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(role.createAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(role.updateAt)}
                      </TableCell>
                      <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                        <div className="flex flex-1 gap-3">
                          <CardDeleteButton text="Sil" onClick={() => handleDelete(role.id)} />
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

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <PermissionAddForm id={id} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default UserPermissionTable;
