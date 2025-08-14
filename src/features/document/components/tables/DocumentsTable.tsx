import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { FaEye, FaFileExcel, FaFilePdf, FaFileWord } from "react-icons/fa";

import Button from "@/components/ui/button/Button";
import Spinner from "@/components/ui/spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { rowVariant, tableFadeVariant } from "@/core/constants/constants.animate";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useSignedUrls } from "@/core/hooks/useSignedUrls";
import { formatDate } from "@/core/utils/formatter/dateFormater";
import { showError, showSuccess } from "@/core/utils/toast/toastHelper";

import { DeleteDocument } from "../../service/DocumentService";
import { useDocumentStore } from "../../store/useDocumentStore";
const DocumentViewer = dynamic(() => import("../cards/documentViewer"), { ssr: false });

const DocumentsTable = ({ onClose }: { onClose: () => void }) => {
  const { run } = useRequestAction();
  const { activityDocuments, isLoading, fetchActivityDocuments } = useDocumentStore();
  const signedUrls = useSignedUrls(activityDocuments?.items.map(a => a.filePath) || []);

  const handleClick = (fileType: string, fileUrl: string) => {
    if (
      fileType === "application/msword" /* .doc */ ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" /* .docx */ ||
      fileType === "application/vnd.ms-excel" /* .xls */ ||
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /* .xlsx */
    ) {
      return showError(fileType + " " + "dosya türü tarayıcıda açılamıyor lütfen indiriniz.");
    }
    var url = encodeURIComponent(fileUrl);
    window.open("/management/document?fileType=" + fileType + "&url=" + url, "_blank");
  };

  const handleDelete = async (documentId: string, activityId: string) => {
    run(async () => {
      const response = await DeleteDocument(documentId);
      if (response.status === 200) {
        showSuccess("Döküman Silindi.");
        fetchActivityDocuments(activityId);
      }
    });
  };

  return (
    <>
      <div>
        {" "}
        <div>
          <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Döküman Görüntüle
              </h4>
            </div>

            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mb-4 flex flex-col">
                <div>
                  <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                    Dökümanlar
                  </h5>

                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                    <div className="max-w-full overflow-x-auto">
                      <Table>
                        {/* Table Header */}
                        <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                          <TableRow>
                            <TableCell
                              isHeader
                              className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                            >
                              Döküman Adı
                            </TableCell>
                            <TableCell
                              isHeader
                              className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                            >
                              Dosya Türü
                            </TableCell>
                            <TableCell
                              isHeader
                              className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                            >
                              Oluşturma Tarihi
                            </TableCell>
                            <TableCell
                              isHeader
                              className="text-theme-xs py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                            >
                              Güncellenme Tarihi
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

                        <AnimatePresence mode="wait">
                          {isLoading ? (
                            <>
                              <TableBody key="loading">
                                <TableRow>
                                  <TableCell colSpan={10}>
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.9 }}
                                      transition={{ duration: 0.4 }}
                                      className="flex items-center justify-center py-10"
                                    >
                                      <Spinner />
                                    </motion.div>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </>
                          ) : (
                            <>
                              <motion.tbody
                                key="data"
                                variants={tableFadeVariant}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="divide-y divide-gray-100 dark:divide-gray-800"
                              >
                                {activityDocuments?.items.map((document, index) => (
                                  <motion.tr
                                    key={document.id}
                                    custom={index}
                                    variants={rowVariant}
                                    initial="hidden"
                                    animate="visible"
                                    className="divide-y divide-gray-100 transition-all duration-300 dark:divide-gray-800"
                                  >
                                    <TableCell className="py-3">
                                      <div className="flex items-center gap-3">
                                        <div className="h-[100px] w-[100px] overflow-hidden rounded-md">
                                          {document.fileType === "application/pdf" ? (
                                            <div className="group relative w-fit">
                                              <FaFilePdf size={100} color="grey" />
                                              <button
                                                className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black"
                                                onClick={() =>
                                                  handleClick(
                                                    document.fileType,
                                                    signedUrls[document.filePath],
                                                  )
                                                }
                                              >
                                                <FaEye className="h-5 w-5" />
                                              </button>
                                            </div>
                                          ) : document.fileType === "application/msword" ? (
                                            <div className="group relative w-fit">
                                              <FaFileWord size={100} color="grey" />
                                              <button
                                                className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black"
                                                onClick={() =>
                                                  handleClick(
                                                    document.fileType,
                                                    signedUrls[document.filePath],
                                                  )
                                                }
                                              >
                                                <FaEye className="h-5 w-5" />
                                              </button>
                                            </div>
                                          ) : document.fileType === "application/vnd.ms-excel" ? (
                                            <div className="group relative w-fit">
                                              <FaFileExcel size={100} color="grey" />
                                              <button
                                                className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black"
                                                onClick={() =>
                                                  handleClick(
                                                    document.fileType,
                                                    signedUrls[document.filePath],
                                                  )
                                                }
                                              >
                                                <FaEye className="h-5 w-5" />
                                              </button>
                                            </div>
                                          ) : (
                                            <div className="group relative w-fit">
                                              <Image
                                                width={100}
                                                height={100}
                                                src={
                                                  signedUrls[document.filePath] ??
                                                  "https://cdn-icons-png.freepik.com/512/14591/14591805.png?ga=GA1.1.2139209158.1741974805"
                                                }
                                                className="h-[100px] w-[100px] object-cover"
                                                alt={document.fileName}
                                              />
                                              <button
                                                className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black"
                                                onClick={() =>
                                                  handleClick(
                                                    document.fileType,
                                                    signedUrls[document.filePath],
                                                  )
                                                }
                                              >
                                                <FaEye className="h-5 w-5" />
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                        <div>
                                          <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                                            {document.fileName}
                                          </p>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                      {document.fileType}
                                    </TableCell>
                                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                      {formatDate(document.createAt)}
                                    </TableCell>
                                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                      {formatDate(document.updateAt)}
                                    </TableCell>
                                    <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                                      <Button
                                        key={document.id}
                                        onClick={() =>
                                          handleDelete(document.id, document.activityId)
                                        }
                                      >
                                        Sil
                                      </Button>
                                    </TableCell>
                                  </motion.tr>
                                ))}
                              </motion.tbody>
                            </>
                          )}
                        </AnimatePresence>
                      </Table>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onClose}>
                Kapat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentsTable;
