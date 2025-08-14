import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showError, showSuccess } from "@/core/utils/toast/toastHelper";
import ProfilePhotoPicker from "@/features/personel/components/custom/ProfilePhotoPicker";

import { PersonelAddModel } from "../../model/personel";
import { AddPersonel, UploadPersonelProfileImage } from "../../service/personelService";
import { PersonelDatePicker } from "../custom/PersonelDatePicker";

const PersonelAddForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const initialFormData: PersonelAddModel = {
    birthDate: undefined,
    department: "",
    email: "",
    firstName: "",
    hireDate: undefined,
    imgUrl: "",
    jobTitle: "",
    lastName: "",
    phoneNumber: "",
    isActive: true,
  };
  const { run } = useRequestAction();
  const router = useRouter();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const { errors, clearErrors } = useFormErrors();
  const [formData, setFormData] = useState<PersonelAddModel>(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
    clearErrors();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      return {
        ...prev!,
        [name]: value,
      };
    });
  };

  const handleSave = async () => {
    run(async () => {
      const response = await AddPersonel(formData);
      if ((response.status = 201)) {
        const personelId = response?.data?.id;
        if (!personelId) {
          showError("Personel ID bulunamadı!");
          return;
        }

        if (profilePhoto) {
          const formData = new FormData();
          formData.append("personelId", personelId);
          formData.append("file", profilePhoto);
          run(async () => {
            const fileResponse = await UploadPersonelProfileImage(formData);
            if (fileResponse.status == 201) {
              clearErrors();
              showSuccess("Fotoğraf yüklendi.");
              router.push(`/personel-management/personels/${response.data.id}`);
            }
          });
        }
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
      className="no-scrollbar relative w-full max-w-[1200px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900"
    >
      {" "}
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Personel Oluştur
        </h4>
      </div>
      <div className="custom-scrollbar h-[600px] overflow-y-auto px-2 pb-3">
        <div className="mb-4 flex flex-col">
          <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
              Genel Bilgiler
            </h5>

            <div className="mb-6 flex justify-center">
              <ProfilePhotoPicker
                onChange={(file: File) => setProfilePhoto(file)}
                defaultPhotoUrl={formData?.imgUrl} // önceki resmi göstermek için
              />
            </div>

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

              <div>
                <Label>Departman</Label>
                <Input
                  type="text"
                  value={formData?.department}
                  name="department"
                  onChange={handleChange}
                  error={!!errors.Department}
                  hint={errors.Department!}
                />
              </div>

              <div>
                <Label>Pozisyon</Label>
                <Input
                  type="text"
                  value={formData?.jobTitle}
                  name="jobTitle"
                  onChange={handleChange}
                  error={!!errors.JobTitle}
                  hint={errors.JobTitle!}
                />
              </div>

              <div>
                <PersonelDatePicker
                  text="Doğum Tarihi"
                  onSelected={value =>
                    setFormData(prev =>
                      prev
                        ? { ...prev, hireDate: value }
                        : ({ hireDate: value } as PersonelAddModel),
                    )
                  }
                />
              </div>

              <div>
                <PersonelDatePicker
                  text="İşe Giriş Tarihi"
                  onSelected={value =>
                    setFormData(prev =>
                      prev
                        ? { ...prev, hireDate: value }
                        : ({ hireDate: value } as PersonelAddModel),
                    )
                  }
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
        <Button size="sm" onClick={handleSave}>
          Oluştur
        </Button>
      </div>
    </motion.div>
  );
};

export default PersonelAddForm;
