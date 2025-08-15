import React from "react";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";
import { formatDate } from "@/core/utils/formatter/dateFormater";
import { AssignmentModel } from "@/features/assignment/model/Assignment";

import { ServiceModel } from "../../model/Service";
import ServiceEditForm from "../Forms/ServiceEditForm";
import PriortyStatusIndicator from "../indicators/PriortyStatusIndicator";
import ServiceStatusTableIndicator from "../indicators/ServiceStatusTableIndicator";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";

const ServiceInfoCard = ({
  service,
  assignment,
}: {
  service: ServiceModel;
  assignment: AssignmentModel;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <div className="mt-5 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
              Servis Bilgileri
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-64">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service?.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Öncelik Durumu
                  </p>
                  <PriortyStatusIndicator priorty={service?.priority} key={service?.id} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Başlığı
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service?.serviceTitle}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Açıklaması
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service?.serviceDescription}
                  </p>
                </div>
              </div>

              {/* Servis Durumu ve Öncelik */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Personel - Takım
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {assignment?.personelId
                      ? assignment.personelFirstName + " " + assignment.personelLastName
                      : assignment?.teamId
                        ? assignment.teamName
                        : "Personel - Ekip Atanmamış"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Durumu
                  </p>
                  <ServiceStatusTableIndicator
                    id={service?.id}
                    serviceStatus={service?.serviceStatus}
                    key={service?.id}
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Servis Konusu
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {service?.serviceSubject}
                  </p>
                </div>
              </div>

              {/* Tarih Bilgileri */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Kayıt Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(service?.createAt || "")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Son Güncelleme
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(service?.updateAt || "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <CardUpdateButton text="Düzenle" onClick={openModal} />
        </div>
      </div>

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <ServiceEditForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default ServiceInfoCard;
