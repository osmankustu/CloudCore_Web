"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { formatDate } from "@/core/utils/dateFormater";
import { showSuccess } from "@/core/utils/toastHelper";

import { CorporateCustomerModel } from "../../model/corporateCustomer";
import { DeleteCorporateCustomer } from "../../service/corporateCustomerService";

const CorporateCustomerMetaCard = ({
  corporateCustomer,
  setActive,
}: {
  corporateCustomer: CorporateCustomerModel | undefined;
  setActive: (value: string) => void;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { run, isLoading } = useRequestAction();
  const router = useRouter();

  const handleDelete = async () => {
    run(async () => {
      const response = await DeleteCorporateCustomer(corporateCustomer!.id);
      if (response.status === 200) {
        router.back();
        showSuccess("Müşteri Silindi");
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
                src="https://cdn-icons-png.freepik.com/512/7567/7567279.png?ga=GA1.1.2139209158.1741974805"
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                {corporateCustomer?.companyName}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(corporateCustomer?.createAt || "")}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(corporateCustomer?.updateAt || "")}
                </p>
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
                onClick={() => setActive("ServiceRecords")}
              >
                Servis Kayıtları
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
              <button
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                onClick={openModal}
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  />
                </svg>
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
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
        </div>
      </Modal>
    </>
  );
};

export default CorporateCustomerMetaCard;
