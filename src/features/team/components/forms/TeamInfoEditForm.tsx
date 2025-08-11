import { motion } from "framer-motion";
import React, { useEffect } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toastHelper";

import { UpdateTeam } from "../../service/teamService";
import { useTeamStore } from "../../store/useTeamStore";

const TeamInfoEditForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { run, isLoading } = useRequestAction();
  const { errors, clearErrors } = useFormErrors();
  const { team, updateFormData, fetchTeam, setUpdateFormData, setUpdateField } = useTeamStore();

  useEffect(() => {
    if (!team) return;
    if (team) {
      setUpdateFormData({
        id: team.id,
        isActive: team.isActive,
        name: team.name,
        teamCode: team.teamCode,
        personelIds: team.personels.map(p => p.id),
        createAt: team.createAt,
      });
      clearErrors?.();
    }
  }, [isOpen, team]);

  const handleSave = async () => {
    run(async () => {
      const response = await UpdateTeam(updateFormData);
      if (response.status == 200) {
        onClose();
        showSuccess("Ekip Bilgileri Güncellendi.");
        clearErrors?.();
        fetchTeam(team!.id);
      }
    });
  };

  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900"
      >
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Ekip Bilgileri Güncelle
          </h4>
          <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
            Ekip bilgilerini güncel tutmak için yeni bilgileri girin
          </p>
        </div>

        <div className="flex flex-col">
          <div className="custom-scrollbar h-[150px] overflow-y-auto px-2 pb-3">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Ekip Bilgileri
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label htmlFor="team-name">Ekip Adı</Label>
                  <Input
                    type="text"
                    name="name"
                    id="team-name"
                    value={updateFormData?.name}
                    onChange={e => setUpdateField("name", e.target.value)}
                    error={!!errors.Name}
                    hint={errors.Name!}
                  />
                </div>

                <div>
                  <Label htmlFor="team-status">Ekip Durumu</Label>
                  <Switch
                    label={updateFormData.isActive ? "Aktif" : "Pasif"}
                    defaultChecked={updateFormData.isActive}
                    color="blue"
                    onChange={value => setUpdateField("isActive", value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              Kapat
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <SmoothSpinner />
                  <span>Kaydediliyor...</span>
                </div>
              ) : (
                "Kaydet"
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamInfoEditForm;
