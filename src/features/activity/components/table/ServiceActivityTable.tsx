import React, { useEffect } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { formatDate } from "@/core/utils/dateFormater";
import { showSuccess } from "@/core/utils/toastHelper";
import ServiceStatusTableIndicator from "@/features/service/components/indicators/ServiceStatusTableIndicator";
import { ServiceModel } from "@/features/service/model/Service";

import ActivityDocumentModal from "../../../document/components/modals/DocumentByActivityModal";
import RecordDocumentModal from "../../../document/components/modals/DocumentByServiceModal";
import { DeleteActivity } from "../../service/ActivityService";
import { useActivityStore } from "../../store/useActivityStore";
import ActivityAddForm from "../forms/ActivityAddForm";
import ActivityEditForm from "../forms/ActivityEditForm";

const ServiceActivityTable = ({ service }: { service: ServiceModel }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { poolActivities, fetchPoolActivities } = useActivityStore();
  const { run } = useRequestAction();

  useEffect(() => {
    if (service) {
      run(async () => {
        fetchPoolActivities(service.poolId);
      });
    }
  }, []);

  const handleDelete = async (activityId: string) => {
    try {
      const response = await DeleteActivity(activityId);
      if (response.status === 200) {
        showSuccess("silindi");
        fetchPoolActivities(service.poolId);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <>
      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-50">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Servis Aktiviteleri
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <RecordDocumentModal
              service={service}
              className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              text="Tüm Dökümanları Görüntüle"
            />
            <button
              className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              onClick={() => {
                openModal();
              }}
            >
              Aktivite Oluştur
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Personel
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Notlar
                </TableCell>

                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Durum Güncellemesi
                </TableCell>

                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Dökümanlar
                </TableCell>

                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Tarih
                </TableCell>

                <TableCell
                  isHeader
                  className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  İşlemler
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {poolActivities?.items.map((rec, index) => (
                <TableRow key={index} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {"SA-2512C59F-2750"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.personelId ? rec.firstName + " " + rec.lastName : "Sistem"}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {rec.updateDescription}
                  </TableCell>
                  <TableCell className="text-theme-sm py-2 text-gray-500 dark:text-white">
                    <ServiceStatusTableIndicator
                      id={rec.id}
                      key={rec.id}
                      serviceStatus={rec.serviceStatus}
                    />
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {
                      <ActivityDocumentModal
                        className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                        text="Görüntüle"
                        activity={rec}
                      />
                    }
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(rec.createAt)}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    <div className="flex items-baseline gap-2">
                      <Button size="sm" onClick={() => handleDelete(rec.id)}>
                        Sil
                      </Button>
                      <ActivityEditForm key={rec.id} activityId={rec.id} text="Güncelle" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <ActivityAddForm service={service} isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default ServiceActivityTable;
