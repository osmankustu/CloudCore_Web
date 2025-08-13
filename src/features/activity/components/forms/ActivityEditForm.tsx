"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileExcel, FaFilePdf, FaFileWord, FaTrash } from "react-icons/fa";
import Select from "react-select";

import ComponentCard from "@/components/common/ComponentCard";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showSuccess } from "@/core/utils/toastHelper";
import { AddDocument } from "@/features/document/service/DocumentService";
import { useServiceStore } from "@/features/service/store/useServiceStore";

import { UpdateActivity } from "../../service/ActivityService";
import { useActivityStore } from "../../store/useActivityStore";

const ActivityEditForm = ({
  activityId,
  className,
  text,
}: {
  activityId: string;
  className?: string;
  text: string;
}) => {
  const { isOpen, openModal, closeModal } = useModal();

  const { run, isLoading } = useRequestAction();
  const {
    activity,
    updateFormData,
    fetchPoolActivities,
    fetchActivity,
    setUpdateField,
    setUpdateFormData,
  } = useActivityStore();

  const { service, fetchService } = useServiceStore();

  const { clearErrors } = useFormErrors();

  useEffect(() => {
    run(async () => {
      fetchActivity(activityId);
    });
  }, [isOpen]);

  useEffect(() => {
    if (activity) {
      setUpdateFormData({
        id: activity?.id,
        personelId: activity?.personelId,
        servicePoolId: activity?.servicePoolId,
        serviceStatus: activity.serviceStatus,
        updateDescription: activity.updateDescription,
        createAt: activity.createAt,
      });
    }
  }, [activity]);

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

  const serviceStatusData = [
    { label: "Beklemede", id: "isPending" },
    { label: "Başladı", id: "isStarted" },
    { label: "Devam Ediyor", id: "isContinue" },
    { label: "Tamamlandı", id: "isComplated" },
    { label: "Kapatıldı", id: "isClosed" },
  ];

  const handleSave = async () => {
    run(async () => {
      const response = await UpdateActivity(updateFormData);
      if (response.status === 200) {
        showSuccess("Aktivite Güncellendi");
        clearErrors?.();

        if (files && files.length > 0) {
          const documentFormData = new FormData();
          documentFormData.append("ActivityId", activity!.id); // Activity ID'yi burada kullan
          documentFormData.append("companyId", service!.customerId);
          documentFormData.append("recordCode", service!.recordCode);
          documentFormData.append("serviceRecordId", service!.id);
          files.forEach(file => {
            documentFormData.append("files", file); // 'files' backend ile uyumlu olmalı
          });

          const documentResponse = await AddDocument(documentFormData);
          if (documentResponse.status === 201) {
            showSuccess("Dökümanlar Eklendi");
            clearErrors?.();
            closeModal();
            fetchService(service!.id);
            fetchPoolActivities(service!.poolId);
          }
        } else {
          closeModal();
          fetchService(service!.id);
          fetchPoolActivities(service!.poolId);
        }
      }
    });
  };

  return (
    <>
      <div>
        <Button className={className} onClick={openModal}>
          {text}
        </Button>
      </div>

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
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
              Aktivite Güncelle
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
                      value={updateFormData.updateDescription}
                      onChange={value => setUpdateField("updateDescription", value)}
                    />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                  <div>
                    <Label>Aktivite Durumu</Label>
                    <Select
                      id="y"
                      options={serviceStatusData}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(value: any) => setUpdateField("serviceStatus", value?.id)}
                      getOptionLabel={e => e.label}
                      getOptionValue={e => e.id}
                      value={serviceStatusData.find(i => i.id === updateFormData.serviceStatus)}
                      placeholder={"Aktivite Durumu Seçiniz"}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                  <ComponentCard title={"Belge Yükle 'Opsiyonel'"}>
                    <div className="dark:hover:border-brand-500 hover:border-brand-500 cursor-pointer rounded-xl border border-dashed border-gray-300 transition dark:border-gray-700">
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
                              Desteklenen dosya türleri PNG, JPG, WebP, SVG, DOC , XLS , PDF
                              sürükleyip bırakın veya{" "}
                              <span className="text-blue-400 underline">Dosya Seç</span>
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
                                      ) : file.type === "application/msword" ? (
                                        <div className="flex h-[140px] flex-col items-center justify-center rounded border p-2 text-sm text-gray-400">
                                          <FaFileWord size={40} />
                                          <p className="mt-2 text-center text-xs">{file.name}</p>
                                        </div>
                                      ) : file.type === "application/vnd.ms-excel" ? (
                                        <div className="flex h-[140px] flex-col items-center justify-center rounded border p-2 text-sm text-gray-400">
                                          <FaFileExcel size={40} />
                                          <p className="mt-2 text-center text-xs">{file.name}</p>
                                        </div>
                                      ) : (
                                        <Image
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
                closeModal();
              }}
            >
              Kapat
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <SmoothSpinner />
                  <span>Kaydediliyor...</span>
                </div>
              ) : (
                "Kaydet"
              )}
            </Button>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default ActivityEditForm;
