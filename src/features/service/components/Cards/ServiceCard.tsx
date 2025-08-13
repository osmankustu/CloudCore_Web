"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import { fadeVariants } from "@/core/constants/constants.animate";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useAssignmentStore } from "@/features/assignment/store/useAssignmentStore";

import ServiceActivityTable from "../../../activity/components/table/ServiceActivityTable";
import { useServiceStore } from "../../store/useServiceStore";
import ServiceDetailIndicator from "../indicators/ServiceDetailIndicator";
import ServiceInfoCard from "./ServiceInfoCard";
import ServiceMetaCard from "./ServiceMetaCard";

const ServiceCard = ({ id }: { id: string }) => {
  const { service, fetchService } = useServiceStore();
  const { assignment, fetchAssignment } = useAssignmentStore();
  const { run } = useRequestAction();
  const [activeTab, setActiveTab] = useState("GeneralInfo");

  useEffect(() => {
    run(async () => {
      fetchService(id);
    });
  }, []);

  useEffect(() => {
    run(async () => {
      if (service) {
        fetchAssignment(service.id);
      }
    });
  }, [service]);

  return (
    <>
      <AnimatePresence>
        {service ? (
          <motion.div
            key="content"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ServiceDetailIndicator step={service?.serviceStatus} />
            <ServiceMetaCard service={service} setActive={(value: string) => setActiveTab(value)} />

            {activeTab === "GeneralInfo" && (
              <>
                <ServiceInfoCard service={service} assignment={assignment!} />
              </>
            )}

            {activeTab === "ServiceActivity" && (
              <div>
                <ServiceActivityTable service={service} />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="flex min-h-[300px] items-center justify-center"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceCard;
