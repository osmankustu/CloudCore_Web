import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toast/toastHelper";

import { IndividualCustomerAddModel } from "../../model/IndividualCustomer";
import { AddIndividualCustomer } from "../../service/individualCustomerService";

const IndividualCustomerAddForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { errors, clearErrors } = useFormErrors();
  const { run } = useRequestAction();
  const [formData, setFormData] = useState<IndividualCustomerAddModel | undefined>();
  const router = useRouter();
  const initialFormData: IndividualCustomerAddModel = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  useEffect(() => {
    setFormData(initialFormData);
    clearErrors();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    run(async () => {
      const response = await AddIndividualCustomer(formData!);
      if (response.status == 201) {
        onClose();
        showSuccess("Müşteri Eklendi");
        router.push(`/customers/individual/${response.data.id}`);
      }
    });
  };
  return (
    <motion.div
      key="modal-content"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900"
    >
      {/* Burası senin modal içeriğin */}
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Bireysel Müşteri Oluştur
        </h4>
      </div>

      <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
        <div className="mb-4 flex flex-col">
          <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
              Genel Bilgiler
            </h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Adı</Label>
                <Input
                  type="text"
                  value={formData?.firstName}
                  name="firstName"
                  onChange={handleChange}
                  error={!!errors.FirstName}
                  hint={errors.FirstName!}
                />
              </div>

              <div>
                <Label>Soyadı</Label>
                <Input
                  type="text"
                  value={formData?.lastName}
                  name="lastName"
                  onChange={handleChange}
                  error={!!errors.LastName}
                  hint={errors.LastName!}
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
                <Label>Telefon</Label>
                <Input
                  type="text"
                  value={formData?.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  error={!!errors.PhoneNumber}
                  hint={errors.PhoneNumber!}
                />
              </div>

              <div>
                <Label>E-Posta </Label>
                <Input
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
  );
};

export default IndividualCustomerAddForm;
