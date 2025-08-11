"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/ui/spinner/Spinner";
import { useRequestAction } from "@/core/hooks/useRequestAction";

import { useTeamStore } from "../../store/useTeamStore";
import TeamMemberTable from "../tables/TeamMemberTable";
import TeamInfoCard from "./TeamInfoCard";
import TeamMetaCard from "./TeamMetaCard";

const TeamCard = ({ id }: { id: string }) => {
  const { team, fetchTeam } = useTeamStore();
  const { run } = useRequestAction();
  const [activeTab, setActiveTab] = useState("GeneralInfo");

  const fadeVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    run(async () => {
      fetchTeam(id);
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {team ? (
          <motion.div
            key="content"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <TeamMetaCard team={team} setActive={(value: string) => setActiveTab(value)} />

            {activeTab === "GeneralInfo" && (
              <>
                <TeamInfoCard team={team} />
                <TeamMemberTable data={team?.personels} />
              </>
            )}

            {activeTab === "WorkRegist" && <div>Ekibin Yaptığı İşler Burada Listelenecek</div>}
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

export default TeamCard;
