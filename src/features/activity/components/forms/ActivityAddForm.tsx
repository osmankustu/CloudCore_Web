import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import Select from "react-select";

import ComponentCard from "@/components/common/ComponentCard";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { serviceStatusData } from "@/core/constants/constants.data";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toastHelper";
import { GetTokenInPersonelId } from "@/core/utils/tokenHandler";
import { AddDocument } from "@/features/document/service/DocumentService";
import { ServiceModel } from "@/features/service/model/Service";
import { useServiceStore } from "@/features/service/store/useServiceStore";

import { ActivityAddModel } from "../../model/Activity";
import { AddActivity } from "../../service/ActivityService";
import { useActivityStore } from "../../store/useActivityStore";

const ActivityAddForm = ({
  isOpen,
  service,
  onClose,
}: {
  isOpen: boolean;
  service: ServiceModel;
  onClose: () => void;
}) => {
  const { run, isLoading } = useRequestAction();
  const { errors, clearErrors } = useFormErrors();
  const { fetchPoolActivities } = useActivityStore();
  const { fetchService } = useServiceStore();
  const [formData, setFormData] = useState<ActivityAddModel>({
    servicePoolId: service.poolId,
    serviceStatus: "",
    updateDescription: "",
    personelId: GetTokenInPersonelId(),
  });

  //File Inputs

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
  });

  const handleSave = async () => {
    run(async () => {
      const response = await AddActivity(formData);
      if (response.status === 201) {
        showSuccess("Aktivite Eklendi");
        clearErrors?.();
        const activityId = response.data?.id;

        if (files && files.length > 0) {
          const documentFormData = new FormData();
          documentFormData.append("ActivityId", activityId); // Activity ID'yi burada kullan
          documentFormData.append("companyId", service.customerId);
          documentFormData.append("recordCode", service.recordCode);
          documentFormData.append("serviceRecordId", service.id);
          files.forEach(file => {
            documentFormData.append("files", file); // 'files' backend ile uyumlu olmalı
          });

          const documentResponse = await AddDocument(documentFormData);
          if (documentResponse.status === 201) {
            showSuccess("Dökümanlar Eklendi");
            clearErrors?.();
            onClose();
            fetchService(service.id);
            fetchPoolActivities(service.poolId);
          }
        } else {
          onClose();
          fetchService(service.id);
          fetchPoolActivities(service.poolId);
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
      className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900"
    >
      {" "}
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Aktivite Oluştur
        </h4>
      </div>
      <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
        <div className="mb-4 flex flex-col">
          <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
              Genel Bilgiler
            </h5>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <div>
                <Label>Aktivite Notu</Label>
                <TextArea
                  value={formData.updateDescription}
                  error={!!errors.UpdateDescription}
                  hint={errors.UpdateDescription!}
                  onChange={value =>
                    setFormData(prev => ({
                      ...prev,
                      updateDescription: value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <div>
                <Label>Aktivite Durumu</Label>
                <Select
                  id="y"
                  options={serviceStatusData}
                  onChange={value =>
                    setFormData(prev => ({ ...prev, serviceStatus: value?.id }) as ActivityAddModel)
                  }
                  getOptionLabel={e => e.label}
                  getOptionValue={e => e.id}
                  placeholder={"Aktivite Durumu Seçiniz"}
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <ComponentCard title={"Döküman Ekle 'Opsiyonel'"}>
                <div className="dark:hover:border-brand-500 hover:border-brand-500 cursor-pointer rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700 dark:bg-gray-700">
                  <div
                    {...getRootProps()}
                    className={`relative min-h-[250px] cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
                      isDragActive
                        ? "border-blue-500 bg-gray-700 dark:bg-gray-300"
                        : "border-gray-600 bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    <input {...getInputProps()} />

                    {files.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center gap-3">
                        <div className="rounded-full bg-gray-700 p-4">
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          Dosyaları Buraya Sürükle ve Bırak
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Desteklenen dosya türleri PNG, JPG, WebP, SVG, DOC , XLS , PDF sürükleyip
                          bırakın veya <span className="text-blue-400 underline">Dosya Seç</span>
                        </p>
                      </div>
                    ) : (
                      <AnimatePresence>
                        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                          {files.map((file, index) => {
                            const preview = URL.createObjectURL(file);
                            return (
                              <motion.div
                                key={file.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative"
                              >
                                <div
                                  key={index}
                                  className="group relative overflow-hidden rounded-lg border border-gray-700"
                                >
                                  {file.type === "application/pdf" ? (
                                    <div className="flex h-[140px] flex-col items-center justify-center rounded border p-2 text-sm text-gray-400">
                                      <FaFilePdf size={40} />
                                      <p className="mt-2 text-center text-xs">{file.name}</p>
                                    </div>
                                  ) : (
                                    <Image
                                      height={28}
                                      width={28}
                                      src={preview}
                                      alt={file.name}
                                      className="h-28 w-full object-cover"
                                    />
                                  )}

                                  <button
                                    onClick={e => {
                                      e.stopPropagation(); // Tıklamanın bubble'lanmasını engelle
                                      e.preventDefault(); // Varsayılan input davranışını engelle
                                      removeFile(index);
                                    }}
                                    className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-red-500"
                                    title="Remove"
                                  >
                                    <FaTrash size={16} />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </ComponentCard>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            onClose();
          }}
        >
          Kapat
        </Button>
        <Button size="sm" onClick={handleSave}>
          Oluştur
        </Button>
      </div>
    </motion.div>
  );
};

export default ActivityAddForm;
