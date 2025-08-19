import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useUserStore } from "../../store/useUserStore";
import { UpdatePersonelFromTenant } from "../../service/userService";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import { PersonelDatePicker } from "@/features/employee/personel/components/custom/PersonelDatePicker";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";

const UserEditForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { errors, clearErrors } = useFormErrors();
  const { user, updateFormData, setUpdateForm, setUpdateField, fetchUser } = useUserStore();
  const { run, isLoading } = useRequestAction();

  useEffect(() => {
    if (user) {
      setUpdateForm({
        birthDate: user.birthDate,
        createAt: user.createAt,
        department: user.department,
        email: user.email,
        firstName: user.firstName,
        hireDate: user.hireDate,
        id: user.id,
        personelCode: user.personelCode,
        imgUrl: user.imgUrl,
        isActive: user.isActive,
        jobTitle: user.jobTitle,
        phoneNumber: user.phoneNumber,
        lastName: user.lastName,
        updateAt: user.updateAt,
      });
    }
    clearErrors?.();
  }, [user, isOpen]);

  const handleSave = () => {
    run(async () => {
      const response = await UpdatePersonelFromTenant(updateFormData);
      if (response?.status === 200) {
        onClose();
        showSuccess("Hesap bilgileri güncellendi.");
        clearErrors?.();
        fetchUser();
      }
    });
  };

  return (
    <div>
      {" "}
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
                Hesap Bilgileri Güncelle
              </h4>
              <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
                Hesap bilgilerinizi güncel tutmak için yeni bilgileri girin
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

                    <div className="w-full">
                      <PersonelDatePicker
                        text={"Doğum Tarihi"}
                        onSelected={value => setUpdateField("birthDate", value)}
                        defaultValue={
                          updateFormData?.birthDate &&
                          !isNaN(new Date(updateFormData.birthDate).getTime())
                            ? new Date(updateFormData.birthDate)
                            : undefined
                        }
                      />
                    </div>

                    <div>
                      <Label>Telefon</Label>
                      <Input
                        type="text"
                        value={updateFormData?.phoneNumber}
                        name="phoneNumber"
                        onChange={e => setUpdateField("phoneNumber", e.target.value)}
                        error={!!errors.PhoneNumber}
                        hint={errors.PhoneNumber!}
                      />
                    </div>

                    <div>
                      <Label>E-Posta </Label>
                      <Input
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
    </div>
  );
};

export default UserEditForm;
