"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import { motion } from "framer-motion";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { UserOperationClaimAddModel } from "../../model/userOperationClaim";
import { addUserClaims } from "../../service/userOperationClaimService";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import Select from "react-select";
import { useOperationClaimStore } from "../../store/useOperationClaimStore";
import { useUserOperationClaimStore } from "../../store/useUserOperationClaimStore";

export default function PermissionAddForm({ id, onClose }: { id: string; onClose: () => void }) {
  const { run } = useRequestAction();
  const { OperationClaimOptions, fetchOperationClaimOptions } = useOperationClaimStore();
  const { fetchUserRoles } = useUserOperationClaimStore();
  const [formData, setFormData] = useState<UserOperationClaimAddModel>({
    operationClaimId: 0,
    userId: "",
  });

  const hiddenPrefixes = ["auth", "operationclaims", "useroperationclaims", "admin", "users"]; // Bu prefix ile başlayan roller görünmez

  function shouldHideRole(roleName: string) {
    const [prefix, action] = roleName.split(".");

    // Prefix kontrolü
    if (hiddenPrefixes.includes(prefix)) return true;

    return false;
  }

  const visibleRoles = OperationClaimOptions?.items.filter(
    role => !shouldHideRole(role.name.toLocaleLowerCase()),
  );

  useEffect(() => {
    // API’den çekilecek
    setFormData(prev => ({ ...prev, userId: id }) as UserOperationClaimAddModel);
    run(async () => {
      fetchOperationClaimOptions();
    });
  }, []);

  const handleAdd = async () => {
    run(async () => {
      const res = await addUserClaims(formData);
      if (res?.status === 201) {
        showSuccess("Yetki atandı.");
        fetchUserRoles(id);
        onClose();
      }
    });
  };

  return (
    <div>
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900"
      >
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Kullanıcı Yetki Ekle
          </h4>
        </div>
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mb-4 flex flex-col">
            <Select
              options={visibleRoles}
              onChange={value =>
                setFormData(
                  prev => ({ ...prev, operationClaimId: value?.id }) as UserOperationClaimAddModel,
                )
              }
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Kapat
          </Button>
          <Button size="sm" variant="outline" onClick={handleAdd}>
            Ekle
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
