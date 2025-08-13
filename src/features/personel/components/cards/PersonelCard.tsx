"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import { fadeVariants } from "@/core/constants/constants.animate";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { usePersonelStore } from "@/features/personel/store/usePersonelStore";

import PersonenlAddressCard from "./PersonelAddressCard";
import PersonelContactCard from "./PersonelContactCard";
import PersonelInfoCard from "./PersonelInfoCard";
import PersonelMetaCard from "./PersonelMetaCard";

const PersonelCard = ({ personelId }: { personelId: string }) => {
  const [activeTab, setActiveTab] = useState("GeneralInformation");
  const { run } = useRequestAction();

  const { personel, fetchPersonel } = usePersonelStore();

  useEffect(() => {
    run(() => fetchPersonel(personelId));
  }, []);

  return (
    <>
      <div>
        <AnimatePresence mode="wait">
          {personel ? (
            <>
              <motion.div
                key="content"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PersonelMetaCard
                  personel={personel}
                  setActive={(value: string) => setActiveTab(value)}
                />
                {activeTab === "GeneralInformation" && (
                  <>
                    <PersonelInfoCard personel={personel} />
                    <PersonelContactCard personel={personel} />
                    <PersonenlAddressCard />
                  </>
                )}
                {/* Servis Kayıtları */}
                {activeTab === "ServiceHistory" && (
                  <div className="pt-5">
                    {/* <CompanyRecordTable corporateCustomer={CorporateCustomer} /> */}
                  </div>
                )}

                {/* Servis Raporları */}
                {activeTab === "Reports" && (
                  <div className="pt-5">
                    Bu Alnda x Ait Servis Kayıtlarına Ait Raporlar Listelenecek
                  </div>
                )}

                {/* Notlar */}
                {activeTab === "Notes" && (
                  <div className="pt-5">Bu Alanda x Ait Notlar Listelenecek</div>
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

export default PersonelCard;
