import React from "react";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";
import { formatDate } from "@/core/utils/formatter/dateFormater";

import { TeamModel } from "../../model/team";
import TeamInfoEditForm from "../forms/TeamInfoEditForm";
import TeamStatusIndicator from "../Indicators/TeamStatusIndicator";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";

const TeamInfoCard = ({ team }: { team: TeamModel }) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <div className="mt-5 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
              Ekip Bilgileri
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ekip Adı</p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {team?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ekip Durumu
                  </p>
                  <TeamStatusIndicator status={team?.isActive} />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Oluşturma Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(team?.createAt || "")}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Güncelleme Tarihi
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {formatDate(team?.updateAt || "")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CardUpdateButton onClick={openModal} text="Düzenle" />
        </div>
      </div>

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <TeamInfoEditForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default TeamInfoCard;
