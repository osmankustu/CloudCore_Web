"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toast/toastHelper";

import { UpdateIndividualCustomer } from "../../service/individualCustomerService";
import { useIndividualCustomerStore } from "../../store/useIndividualCustomerStore";

const IndividualCustomerInfoUpdateForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { errors, clearErrors } = useFormErrors();
  const { run, isLoading } = useRequestAction();
  const {
    individualCustomer,
    updateFormData,
    setUpdateField,
    setUpdateFormData,
    fetchIndividualCustomer,
  } = useIndividualCustomerStore();

  useEffect(() => {
    if (individualCustomer) {
      setUpdateFormData({
        id: individualCustomer.id,
        customerNo: individualCustomer.customerNo,
        email: individualCustomer.email,
        firstName: individualCustomer.firstName,
        lastName: individualCustomer.lastName,
        phoneNumber: individualCustomer.phoneNumber,
        createAt: individualCustomer.createAt,
      });
    }
  }, [individualCustomer]);

  useEffect(() => {
    if (individualCustomer) {
      setUpdateFormData({
        id: individualCustomer.id,
        customerNo: individualCustomer.customerNo,
        email: individualCustomer.email,
        firstName: individualCustomer.firstName,
        lastName: individualCustomer.lastName,
        phoneNumber: individualCustomer.phoneNumber,
        createAt: individualCustomer.createAt,
      });
    }

    clearErrors();
  }, [isOpen]);

  const handleSave = async () => {
    // Handle save logic here
    run(async () => {
      const response = await UpdateIndividualCustomer(updateFormData);
      if (response.status == 200) {
        onClose();
        showSuccess("Genel Bilgiler Güncellendi");
        fetchIndividualCustomer(individualCustomer!.id);
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
              Müşteri Bilgileri Güncelle
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Müşteri bilgilerini güncel tutmak için yeni bilgileri girin
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[150px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Müşteri Bilgileri
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Adı</Label>
                    <Input
                      type="text"
                      value={updateFormData?.firstName}
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
                      onChange={e => setUpdateField("lastName", e.target.value)}
                      error={!!errors.LastName}
                      hint={errors.LastName!}
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

export default IndividualCustomerInfoUpdateForm;
