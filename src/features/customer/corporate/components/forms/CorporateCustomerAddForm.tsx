import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toastHelper";

import { CorporateCustomerAddModel } from "../../model/corporateCustomer";
import { AddCorporateCustomer } from "../../service/corporateCustomerService";

const CorporateCustomerAddForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { run } = useRequestAction();
  const { errors, clearErrors } = useFormErrors();
  const [formData, setFormData] = useState<CorporateCustomerAddModel>({
    authorizedEmail: "",
    authorizedPersonName: "",
    authorizedPhoneNumber: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    sector: "",
    taxNumber: "",
  });

  useEffect(() => {
    clearErrors?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    run(async () => {
      const response = await AddCorporateCustomer(formData!);
      if (response.status == 201) {
        onClose();
        showSuccess("Müşteri Eklendi");
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
            Firma Oluştur
          </h4>
        </div>
        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="mb-4 flex flex-col">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Genel Bilgiler
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label htmlFor="companyName">Firma Adı</Label>
                  <Input
                    id="companyName"
                    type="text"
                    value={formData?.companyName}
                    name="companyName"
                    onChange={handleChange}
                    error={!!errors.CompanyName}
                    hint={errors.CompanyName!}
                  />
                </div>

                <div>
                  <Label htmlFor="taxNumber">Vergi Numarası</Label>
                  <Input
                    id="taxNumber"
                    type="text"
                    value={formData?.taxNumber}
                    name="taxNumber"
                    onChange={handleChange}
                    error={!!errors.TaxNumber}
                    hint={errors.TaxNumber!}
                  />
                </div>

                <div>
                  <Label htmlFor="sector">Sektör</Label>
                  <Input
                    id="sector"
                    type="text"
                    value={formData?.sector}
                    name="sector"
                    onChange={handleChange}
                    error={!!errors.Sector}
                    hint={errors.Sector!}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-col">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                İletişim Bilgileri
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label htmlFor="phoneNumber">Telefon</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    value={formData?.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                    error={!!errors.PhoneNumber}
                    hint={errors.PhoneNumber!}
                  />
                </div>

                <div>
                  <Label htmlFor="e-mail">E-Posta</Label>
                  <Input
                    id="e-mail"
                    type="email"
                    value={formData?.email}
                    name="email"
                    onChange={handleChange}
                    error={!!errors.Email}
                    hint={errors.Email!}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-col">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Yetkili İletişim Bilgileri
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label htmlFor="authorizedPersonName">Adı Soyadı</Label>
                  <Input
                    id="authorizedPersonName"
                    type="text"
                    value={formData?.authorizedPersonName}
                    name="authorizedPersonName"
                    onChange={handleChange}
                    error={!!errors.AuthorizedPersonName}
                    hint={errors.AuthorizedPersonName!}
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label htmlFor="authorizedPhoneNumber">Telefon</Label>
                  <Input
                    id="authorizedPhoneNumber"
                    type="text"
                    value={formData?.authorizedPhoneNumber}
                    name="authorizedPhoneNumber"
                    onChange={handleChange}
                    error={!!errors.AuthorizedPhoneNumber}
                    hint={errors.AuthorizedPhoneNumber!}
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label htmlFor="authorized-Email">Yetkili E-Posta</Label>
                  <Input
                    id="authorized-Email"
                    type="text"
                    value={formData?.authorizedEmail}
                    name="authorizedEmail"
                    onChange={handleChange}
                    error={!!errors.AuthorizedEmail}
                    hint={errors.AuthorizedEmail!}
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
          <Button size="sm" variant="outline" onClick={handleSave}>
            Oluştur
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CorporateCustomerAddForm;
