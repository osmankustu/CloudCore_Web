import React, { useEffect } from "react";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { ActivityModel } from "@/features/activity/model/Activity";

import { useDocumentStore } from "../../store/useDocumentStore";
import DocumentsTable from "../tables/DocumentsTable";

const DocumentByActivityModal = ({
  activity,
  text,
  className,
}: {
  activity: ActivityModel;
  text: string;
  className: string;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { run } = useRequestAction();
  const { fetchActivityDocuments } = useDocumentStore();

  useEffect(() => {
    run(async () => {
      fetchActivityDocuments(activity.id);
    });
  }, [isOpen]);

  return (
    <>
      <div>
        <button className={className} onClick={openModal}>
          {text}
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <DocumentsTable onClose={closeModal} />
      </Modal>
    </>
  );
};

export default DocumentByActivityModal;
