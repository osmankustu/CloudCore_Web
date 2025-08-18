"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";

import { CorporateCustomerModel } from "../../model/corporateCustomer";
import CorporateCustomerContactEditForm from "../forms/CorporateCustomerContactEditForm";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";
import { usePermission } from "@/core/hooks/auth/usePermission";
import customerPermissions from "@/features/customer/constants/customerPermissions";

const CorporateCustomerContactCard = ({
  corporateCustomer,
}: {
  corporateCustomer: CorporateCustomerModel | undefined;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { hasPermission } = usePermission();

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
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Firma Telefon
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {corporateCustomer?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Firma E-Posta
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {corporateCustomer?.email}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Yetkili Adı-Soyadı
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {corporateCustomer?.authorizedPersonName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Yetkili Telefon
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {corporateCustomer?.authorizedPhoneNumber}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Yetkili E-Posta
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                  {corporateCustomer?.authorizedEmail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {hasPermission(customerPermissions.update) ||
        hasPermission(customerPermissions.allPermissions) ? (
          <CardUpdateButton onClick={openModal} text="Düzenle" />
        ) : null}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <CorporateCustomerContactEditForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default CorporateCustomerContactCard;
