import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Select, { Options } from "react-select";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import { PersonelModel } from "@/features/personel/model/personel";
import { usePersonelStore } from "@/features/personel/store/usePersonelStore";

import { TeamAddModel } from "../../model/team";
import { AddTeam } from "../../service/teamService";
import { useTeamStore } from "../../store/useTeamStore";

const TeamAddForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { run, isLoading } = useRequestAction();
  const { personelOptions, fetchPersonelOptions } = usePersonelStore();
  const { fetchTeams } = useTeamStore();
  const { errors, clearErrors } = useFormErrors();
  const [formData, setFormData] = useState<TeamAddModel>({
    name: "",
    personelIds: [],
  });

  useEffect(() => {
    clearErrors?.();
  }, [isOpen]);

  const handleMultiSelectChange = (selectedOptions: Options<unknown>) => {
    const ids = selectedOptions
      ? selectedOptions.map((opt: unknown) => (opt as PersonelModel).id)
      : [];
    setFormData(
      prev =>
        ({
          ...prev,
          personelIds: ids,
        }) as TeamAddModel,
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSave = () => {
    run(async () => {
      const response = await AddTeam(formData!);
      if (response.status === 201) {
        onClose();
        showSuccess("Takım Oluşturuldu");
        fetchTeams(0, 20);
        clearErrors?.();
      }
    });
  };

  useEffect(() => {
    run(async () => fetchPersonelOptions());
  }, []);

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
        {" "}
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Ekip Oluştur
          </h4>
        </div>
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mb-4 flex flex-col">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Genel Bilgiler
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                <div>
                  <Label htmlFor="team-name">Ekip Adı</Label>
                  <Input
                    type="text"
                    name="name"
                    id="team-name"
                    value={formData?.name}
                    onChange={handleChange}
                    error={!!errors.Name}
                    hint={errors.Name!}
                  />
                </div>

                <div>
                  <Label htmlFor="team-members">Ekip Üyeleri</Label>
                  <Select
                    id="team-members"
                    isMulti={true}
                    options={personelOptions?.items}
                    getOptionLabel={e => e.firstName + " " + e.lastName + " | " + e.personelCode}
                    getOptionValue={e => e.id}
                    placeholder={"Birden fazla ekip üyesi seçiniz..."}
                    onChange={handleMultiSelectChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Kapat
          </Button>
          <Button size="sm" onClick={handleSave}>
            Oluştur
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamAddForm;
