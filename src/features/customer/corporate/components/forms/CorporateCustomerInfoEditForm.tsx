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

const CorporateCustomerInfoEditForm = ({
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
        showSuccess("Genel Bilgiler Güncellendi");
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
              Genel Bilgileri Güncelle
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Firma bilgilerini güncel tutmak için yeni bilgileri girin
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[270px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Genel Bilgiler
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Firma Adı</Label>
                    <Input
                      type="text"
                      value={updateFormData?.companyName}
                      name="companyName"
                      onChange={e => setUpdateField("companyName", e.target.value)}
                      error={!!errors.CompanyName}
                      hint={errors.CompanyName!}
                    />
                  </div>

                  <div>
                    <Label>Vergi Numarası</Label>
                    <Input
                      type="text"
                      value={updateFormData?.taxNumber}
                      name="taxNumber"
                      onChange={e => setUpdateField("taxNumber", e.target.value)}
                      error={!!errors.TaxNumber}
                      hint={errors.TaxNumber!}
                    />
                  </div>

                  <div>
                    <Label>Sektör</Label>
                    <Input
                      type="text"
                      value={updateFormData?.sector}
                      name="sector"
                      onChange={e => setUpdateField("sector", e.target.value)}
                      error={!!errors.Sector}
                      hint={errors.Sector!}
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
    </div>
  );
};

export default CorporateCustomerInfoEditForm;
