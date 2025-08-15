"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useSignedUrls } from "@/core/hooks/useSignedUrls";
import { formatDate } from "@/core/utils/formatter/dateFormater";
import { showSuccess } from "@/core/utils/toast/toastHelper";

import { PersonelModel } from "../../model/personel";
import { DeletePersonel } from "../../service/personelService";
import CardDeleteButton from "@/components/ui/button/CardDeleteButton";

const PersonelMetaCard = ({
  personel,
  setActive,
}: {
  personel: PersonelModel;
  setActive: (value: string) => void;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { run, isLoading } = useRequestAction();
  const signedUrls = useSignedUrls(personel?.imgUrl ? [personel.imgUrl] : []);
  const router = useRouter();
  const handleDelete = async () => {
    run(async () => {
      const response = await DeletePersonel(personel?.id);
      if ((response.status = 200)) {
        router.back();
        showSuccess("Personel Silindi");
      }
    });
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
            <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src={
                  signedUrls[personel?.imgUrl] ??
                  "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1230.jpg?w=826"
                }
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                {personel?.firstName + " " + personel?.lastName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(personel?.createAt)}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(personel?.updateAt)}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{personel?.personelCode}</p>
              </div>
            </div>
            <div className="order-2 flex grow items-center gap-2 xl:order-3 xl:justify-end">
              <button
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={() => setActive("GeneralInformation")}
              >
                Genel Bilgiler
              </button>

              <button
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={() => setActive("ServiceHistory")}
              >
                İşlem Geçmişi
              </button>

              <button
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={() => setActive("Reports")}
              >
                Raporlar
              </button>

              <button
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={() => setActive("Notes")}
              >
                Notlar
              </button>
              <CardDeleteButton onClick={openModal} text="Sil" />
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pr-14 text-center">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Silmek istediğinizden emin misiniz ?
              </h4>
              <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
                Silmek için onayla butonuna basınız.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mt-6 flex items-center gap-3 px-2 lg:justify-center">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  İptal
                </Button>
                <Button size="sm" onClick={handleDelete} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <SmoothSpinner />
                      <span>Siliniyor...</span>
                    </div>
                  ) : (
                    "Sil"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Modal>
    </>
  );
};

export default PersonelMetaCard;
