import React, { useEffect } from "react";
import { useUserOperationClaimStore } from "../../store/useUserOperationClaimStore";
import { useOperationClaimStore } from "../../store/useOperationClaimStore";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { Modal } from "@/components/ui/modal";
import TableAddButton from "@/components/ui/button/TableAddButton";
import UserPermissionTable from "../tables/UserPermissionTable";
import PermissionAddForm from "../forms/PermissionAddForm";

const UserDetailCard = ({ id }: { id: string }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { User, fetchUser } = useUserOperationClaimStore();
  const { run } = useRequestAction();

  useEffect(() => {
    run(async () => {
      fetchUser(id);
    });
  }, []);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                {User?.firstName} {User?.lastName} Yetki Bilgileri
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">{User?.email}</p>
                <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{User?.status}</p>
              </div>
            </div>
            <div className="order-2 flex grow items-center gap-2 xl:order-3 xl:justify-end">
              <TableAddButton text="Yetki Ekle" onClick={openModal} />
            </div>
          </div>
        </div>
      </div>

      <UserPermissionTable id={id} />

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <PermissionAddForm id={id} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UserDetailCard;
