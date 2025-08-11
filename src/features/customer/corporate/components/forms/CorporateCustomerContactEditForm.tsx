"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toastHelper";

import { UpdateCorporateCustomer } from "../../service/corporateCustomerService";
import { useCorporateCustomerStore } from "../../store/useCorporateCustomerStore";

const CorporateCustomerContactEditForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { errors, clearErrors } = useFormErrors();
  const { run, isLoading } = useRequestAction();
  const {
    corporateCustomer,
    updateFormData,
    setUpdateField,
    setUpdateFormData,
    fetchCorporateCustomer,
  } = useCorporateCustomerStore();

  useEffect(() => {
    const fetchFormData = () => {
      if (corporateCustomer) {
        setUpdateFormData({
          id: corporateCustomer?.id,
          companyName: corporateCustomer?.companyName,
          customerNo: corporateCustomer?.customerNo,
          email: corporateCustomer?.email,
          phoneNumber: corporateCustomer?.phoneNumber,
          taxNumber: corporateCustomer?.taxNumber,
          sector: corporateCustomer?.sector,
          authorizedPersonName: corporateCustomer?.authorizedPersonName,
          authorizedEmail: corporateCustomer?.authorizedEmail,
          authorizedPhoneNumber: corporateCustomer?.authorizedPhoneNumber,
          createAt: corporateCustomer?.createAt,
        });
      }
    };
  }, [corporateCustomer]);

  useEffect(() => {
    if (corporateCustomer) {
      setUpdateFormData({
        id: corporateCustomer?.id,
        companyName: corporateCustomer?.companyName,
        customerNo: corporateCustomer?.customerNo,
        email: corporateCustomer?.email,
        phoneNumber: corporateCustomer?.phoneNumber,
        taxNumber: corporateCustomer?.taxNumber,
        sector: corporateCustomer?.sector,
        authorizedPersonName: corporateCustomer?.authorizedPersonName,
        authorizedEmail: corporateCustomer?.authorizedEmail,
        authorizedPhoneNumber: corporateCustomer?.authorizedPhoneNumber,
        createAt: corporateCustomer?.createAt,
      });
    }
    clearErrors();
  }, [isOpen]);

  const handleSave = async () => {
    // Handle save logic here
    run(async () => {
      const response = await UpdateCorporateCustomer(updateFormData);
      if (response.status == 200) {
        onClose();
        showSuccess("İletişim Bilgileri Güncellendi");
        fetchCorporateCustomer(corporateCustomer!.id);
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
              İletişim Bilgileri Güncelle
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Firma bilgilerini güncel tutmak için yeni bilgileri girin
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Firma İletişim Bilgileri
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="phoneNumber">Telefon</Label>
                    <Input
                      id="phoneNumber"
                      type="text"
                      value={updateFormData?.phoneNumber}
                      name="phoneNumber"
                      onChange={e => setUpdateField("phoneNumber", e.target.value)}
                      error={!!errors.PhoneNumber}
                      hint={errors.PhoneNumber!}
                    />
                  </div>

                  <div>
                    <Label htmlFor="e-mail">E-Posta </Label>
                    <Input
                      id="e-mail"
                      type="email"
                      value={updateFormData?.email}
                      name="email"
                      onChange={e => setUpdateField("email", e.target.value)}
                      error={!!errors.Email}
                      hint={errors.Email!}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Yetkili Kişi İletişim Bilgileri
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label htmlFor="authorizedPersonName">Adı Soyadı</Label>
                    <Input
                      id="authorizedPersonName"
                      type="text"
                      value={updateFormData?.authorizedPersonName}
                      name="authorizedPersonName"
                      onChange={e => setUpdateField("authorizedPersonName", e.target.value)}
                      error={!!errors.AuthorizedPersonName}
                      hint={errors.AuthorizedPersonName!}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label htmlFor="authorizedPhoneNumber">Yetkili Telefon</Label>
                    <Input
                      id="authorizedPhoneNumber"
                      type="text"
                      value={updateFormData?.authorizedPhoneNumber}
                      name="authorizedPhoneNumber"
                      onChange={e => setUpdateField("authorizedPhoneNumber", e.target.value)}
                      error={!!errors.AuthorizedPhoneNumber}
                      hint={errors.AuthorizedPhoneNumber!}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label htmlFor="authorizedEmail">Yetkili E-Posta</Label>
                    <Input
                      id="authorizedEmail"
                      type="text"
                      value={updateFormData?.authorizedEmail}
                      name="authorizedEmail"
                      onChange={e => setUpdateField("authorizedEmail", e.target.value)}
                      error={!!errors.AuthorizedEmail}
                      hint={errors.AuthorizedEmail!}
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

export default CorporateCustomerContactEditForm;
