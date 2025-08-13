"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import { fadeVariants } from "@/core/constants/constants.animate";
import { useRequestAction } from "@/core/hooks/useRequestAction";

import { useIndividualCustomerStore } from "../../store/useIndividualCustomerStore";
import IndividualCustomerServiceRecordTable from "../tables/IndividualCustomerServiceRecordTable";
import IndividualCustomerAddressCard from "./IndividualCustomerAddressCard";
import IndividualCustomerContactCard from "./IndividualCustomerContactCard";
import IndividualCustomerInfoCard from "./IndividualCustomerInfoCard";
import IndividualCustomerMetaCard from "./IndividualCustomerMetaCard";

const IndividualCustomerCard = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState("GeneralInformation");
  const { run } = useRequestAction();

  const { individualCustomer, fetchIndividualCustomer } = useIndividualCustomerStore();

  useEffect(() => {
    if (!id) return;
    run(async () => {
      fetchIndividualCustomer(id);
    });
  }, [id]);

  return (
    <div>
      <AnimatePresence mode="wait">
        {individualCustomer ? (
          <motion.div
            key="content"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <IndividualCustomerMetaCard
              individualCustomer={individualCustomer}
              setActive={(value: string) => setActiveTab(value)}
            />

            {activeTab === "GeneralInformation" && (
              <>
                <IndividualCustomerInfoCard individualCustomer={individualCustomer} />
                <IndividualCustomerContactCard individualCustomer={individualCustomer} />
                <IndividualCustomerAddressCard />
              </>
            )}

            {/* düzenlenecek  */}
            {activeTab === "ServiceRecords" && (
              <div className="pt-5">
                <IndividualCustomerServiceRecordTable individualCustomer={individualCustomer!} />
              </div>
            )}

            {activeTab === "Reports" && (
              <div className="pt-5">
                Bu Alanda Firmaya Ait Servis Kayıtlarına Ait Raporlar Listelenecek
              </div>
            )}

            {activeTab === "Notes" && (
              <div className="pt-5">Bu Alanda Firmaya Ait Notlar Listelenecek</div>
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
    </div>
  );
};

export default IndividualCustomerCard;
