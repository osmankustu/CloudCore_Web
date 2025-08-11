'use client';
import React, { useEffect, useState } from 'react';
import { useRequestAction } from '@/hooks/useRequestAction';
import IndividualCustomerMetaCard from './IndividualCustomerMetaCard';
import IndividualCustomerInfoCard from './IndividualCustomerInfoCard';
import IndividualCustomerContactCard from './IndividualCustomerContactCard';
import IndividualCustomerAddressCard from './IndividualCustomerAddressCard';
import IndividualCustomerServiceRecordTable from './IndividualCustomerServiceRecordTable';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../../../../components/ui/Spinner';
import { useIndividualCustomerStore } from '@/Stores/useIndividualCustomerStore';

const IndividualCustomerCard = ({ id }) => {
  const [activeTab, setActiveTab] = useState('GeneralInformation');
  const { run } = useRequestAction();

  const { individualCustomer, fetchIndividualCustomer } = useIndividualCustomerStore();

  useEffect(() => {
    if (!id) return;
    run(async () => {
      fetchIndividualCustomer(id);
    });
  }, [id]);

  const fadeVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

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

            {activeTab === 'GeneralInformation' && (
              <>
                <IndividualCustomerInfoCard individualCustomer={individualCustomer} />
                <IndividualCustomerContactCard individualCustomer={individualCustomer} />
                <IndividualCustomerAddressCard />
              </>
            )}

            {/* düzenlenecek  */}
            {activeTab === 'ServiceRecords' && (
              <div className="pt-5">
                <IndividualCustomerServiceRecordTable individualCustomer={individualCustomer!} />
              </div>
            )}

            {activeTab === 'Reports' && (
              <div className="pt-5">
                Bu Alanda Firma'ya Ait Servis Kayıtlarına Ait Raporlar Listelenecek
              </div>
            )}

            {activeTab === 'Notes' && (
              <div className="pt-5">Bu Alanda Firma'ya Ait Notlar Listelenecek</div>
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
