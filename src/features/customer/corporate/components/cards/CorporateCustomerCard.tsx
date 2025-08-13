"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import { fadeVariants } from "@/core/constants/constants.animate";
import { useRequestAction } from "@/core/hooks/useRequestAction";

import { useCorporateCustomerStore } from "../../store/useCorporateCustomerStore";
import CorporateCustomerServiceRecordTable from "../tables/CorporateCustomerServiceRecordTable";
import CorporateCustomerAddressCard from "./CorporateCustomerAddressCard";
import CorporateCustomerContactCard from "./CorporateCustomerContactCard";
import CorporateCustomerInfoCard from "./CorporateCustomerInfoCard";
import CorporateCustomerMetaCard from "./CorporateCustomerMetaCard";

const CorporateCustomerCard = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState("GeneralInformation");
  const { run } = useRequestAction();
  const { corporateCustomer, fetchCorporateCustomer } = useCorporateCustomerStore();

  useEffect(() => {
    if (!id) return;
    run(() => fetchCorporateCustomer(id));
  }, []);

  return (
    <>
      <div>
        <AnimatePresence mode="wait">
          {corporateCustomer ? (
            <>
              <motion.div
                key="content"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <CorporateCustomerMetaCard
                  corporateCustomer={corporateCustomer}
                  setActive={(value: string) => setActiveTab(value)}
                />
                {activeTab === "GeneralInformation" && (
                  <>
                    <CorporateCustomerInfoCard corporateCustomer={corporateCustomer} />
                    <CorporateCustomerContactCard corporateCustomer={corporateCustomer} />
                    <CorporateCustomerAddressCard />
                  </>
                )}
                {/* Servis Kayıtları */}
                {activeTab === "ServiceRecords" && (
                  <div className="pt-5">
                    <CorporateCustomerServiceRecordTable corporateCustomer={corporateCustomer} />
                  </div>
                )}

                {/* Servis Raporları */}
                {activeTab === "Reports" && (
                  <div className="pt-5">
                    Bu Alnda Firma ya Ait Servis Kayıtlarına Ait Raporlar Listelenecek
                  </div>
                )}

                {/* Notlar */}
                {activeTab === "Notes" && (
                  <div className="pt-5">Bu Alanda Firma ya Ait Notlar Listelenecek</div>
                )}
              </motion.div>
            </>
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
    </>
  );
};

export default CorporateCustomerCard;
