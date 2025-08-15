"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";

import { PersonelModel } from "../../model/personel";
import PersonelContactEditForm from "../forms/PersonelContactEditForm";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";

const PersonelContactCard = ({ personel }: { personel: PersonelModel | undefined }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="mt-5 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
            İletişim Bilgileri
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Telefon</p>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {personel?.phoneNumber}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">E-Posta</p>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {personel?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CardUpdateButton onClick={openModal} text="Düzenle" />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <PersonelContactEditForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default PersonelContactCard;
