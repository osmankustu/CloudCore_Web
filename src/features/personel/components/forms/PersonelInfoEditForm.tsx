"use client";
import { motion } from "framer-motion";
import React, { useEffect, useMemo } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toastHelper";

import { UpdatePersonel } from "../../service/personelService";
import { usePersonelStore } from "../../store/usePersonelStore";
import { PersonelDatePicker } from "../custom/PersonelDatePicker";

const PersonelInfoEditForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { errors, clearErrors } = useFormErrors();
  const { run, isLoading } = useRequestAction();
  const { personel, updateFormData, setUpdateField, setUpdateFormData, fetchPersonel } =
    usePersonelStore();

  useEffect(() => {
    if (!personel) return;
    if (personel) {
      setUpdateFormData({
        birthDate: personel.birthDate,
        createAt: personel.createAt,
        department: personel.department,
        email: personel.email,
        firstName: personel.firstName,
        hireDate: personel.hireDate,
        id: personel.id,
        personelCode: personel.personelCode,
        imgUrl: personel.imgUrl,
        isActive: personel.isActive,
        jobTitle: personel.jobTitle,
        phoneNumber: personel.phoneNumber,
        lastName: personel.lastName,
        updateAt: personel.updateAt,
      });
    }

    clearErrors?.(); // varsa çağır
  }, [personel, isOpen]);

  const birthDate = useMemo(() => new Date(personel!.birthDate), [personel?.birthDate]);
  const hireDate = useMemo(() => new Date(personel!.hireDate), [personel?.hireDate]);

  const handleSave = async () => {
    // Handle save logic here
    run(async () => {
      const response = await UpdatePersonel(updateFormData);
      if (response.status == 200) {
        onClose();
        showSuccess("Genel Bilgiler Güncellendi");
        fetchPersonel(personel?.id);
      }
    });
  };
  return (
    <div>
      <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Genel Bilgileri Güncelle
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Personel bilgilerini güncel tutmak için yeni bilgileri girin
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[390px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Genel Bilgiler
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Adı</Label>
                    <Input
                      type="text"
                      value={updateFormData?.firstName}
                      name="firstName"
                      onChange={e => setUpdateField("firstName", e.target.value)}
                      error={!!errors.FirstName}
                      hint={errors.FirstName!}
                    />
                  </div>

                  <div>
                    <Label>Soyadı</Label>
                    <Input
                      type="text"
                      value={updateFormData?.lastName}
                      name="lastName"
                      onChange={e => setUpdateField("lastName", e.target.value)}
                      error={!!errors.LastName}
                      hint={errors.LastName!}
                    />
                  </div>

                  <div>
                    <Label>Departman</Label>
                    <Input
                      type="text"
                      value={updateFormData?.department}
                      name="department"
                      onChange={e => setUpdateField("department", e.target.value)}
                      error={!!errors.Department}
                      hint={errors.Department!}
                    />
                  </div>

                  <div>
                    <Label>Pozisyon</Label>
                    <Input
                      type="text"
                      value={updateFormData?.jobTitle}
                      name="jobTitle"
                      onChange={e => setUpdateField("jobTitle", e.target.value)}
                      error={!!errors.JobTitle}
                      hint={errors.JobTitle!}
                    />
                  </div>

                  <div className="w-full">
                    <PersonelDatePicker
                      text={"Doğum Tarihi"}
                      onSelected={value => setUpdateField("birthDate", value)}
                      defaultValue={new Date(birthDate)}
                    />
                  </div>

                  <div className="w-full">
                    <PersonelDatePicker
                      text={"İşe Giriş Tarihi"}
                      onSelected={value => setUpdateField("hireDate", value)}
                      defaultValue={new Date(hireDate)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Label>Personel Durumu :</Label>
                    <Switch
                      label={updateFormData?.isActive ? "Aktif" : "Pasif"}
                      defaultChecked={updateFormData?.isActive}
                      color={"green"}
                      onChange={value => setUpdateField("isActive", value.toString())}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onClose}>
                Close
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
    </div>
  );
};

export default PersonelInfoEditForm;
