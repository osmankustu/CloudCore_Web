"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";
import { formatDate } from "@/core/utils/formatter/dateFormater";

import { PersonelModel } from "../../model/personel";
import PersonelInfoEditForm from "../forms/PersonelInfoEditForm";
import PersonelStatusIndicator from "../indicators/PersonelStatusIndicator";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";

const PersonelInfoCard = ({ personel }: { personel: PersonelModel }) => {
  // Todo: making a Personel image upload component

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="mt-5 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
              Genel Bilgiler
            </h4>

            <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Personel Kodu
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {personel?.personelCode}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Adı Soyadı</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {personel?.firstName + " " + personel?.lastName}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departmanı</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {personel?.department}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pozisyon</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {personel?.jobTitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Durum</p>
                  <PersonelStatusIndicator status={personel?.isActive} text={""} />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    İşe Giriş Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(personel.hireDate)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Doğum Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(personel.birthDate)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Oluşturma Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(personel?.createAt)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Güncelleme Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(personel?.updateAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CardUpdateButton onClick={openModal} text="Düzenle" />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <PersonelInfoEditForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default PersonelInfoCard;
