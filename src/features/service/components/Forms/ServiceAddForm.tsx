"use cilent";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { priortyData } from "@/core/constants/constants.data";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { getGoogleMapsLink } from "@/core/utils/formatter/mapsHelper";
import { useCorporateCustomerStore } from "@/features/customer/corporate/store/useCorporateCustomerStore";
import { useIndividualCustomerStore } from "@/features/customer/individual/store/useIndividualCustomerStore";
import { usePersonelStore } from "@/features/personel/store/usePersonelStore";
import { useTeamStore } from "@/features/team/store/useTeamStore";

import { ServiceAddModel } from "../../model/Service";
import { AddService } from "../../service/ServiceService";
import { AssignmentSelector } from "../custom/AssignmentsSelector";
import CityStateSelect from "../custom/CitySelector";
import { CustomerSelector } from "../custom/CustomerSelector";
import { showSuccess } from "@/core/utils/toast/toastHelper";

const ServiceAddForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const { run } = useRequestAction();
  const { errors, clearErrors } = useFormErrors();

  const { personelOptions, fetchPersonelOptions } = usePersonelStore();
  const { teamOptions, fetchTeamOptions } = useTeamStore();
  const { individualOptions, fetchIndividualOptions } = useIndividualCustomerStore();
  const { corporateOptions, fetchCorporateOptions } = useCorporateCustomerStore();

  const [formData, setFormData] = useState<ServiceAddModel | undefined>();

  const initialData: ServiceAddModel = {
    cityId: 0,
    cityName: "",
    customerId: "",
    customerType: "",
    districtId: 0,
    districtName: "",
    lat: 0,
    lon: 0,
    navigationUrl: "",
    personelId: "",
    priority: "",
    serviceDescription: "",
    serviceSubject: "",
    serviceTitle: "",
    teamId: "",
  };

  //Test
  useEffect(() => {
    run(async () => {
      if (!corporateOptions) {
        fetchCorporateOptions();
        fetchIndividualOptions();
        fetchPersonelOptions();
        fetchTeamOptions();
      }
    });
  }, []);

  useEffect(() => {
    setFormData(initialData);
    clearErrors();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }) as ServiceAddModel);
  };

  const handleSave = async () => {
    run(async () => {
      const response = await AddService(formData!);
      if (response.status == 201) {
        clearErrors();
        onClose();
        showSuccess("Servis Kaydı Eklendi");
        router.push(`/management/services/${response.data.id}`);
      }
    });
  };
  return (
    <>
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
            Servis Kaydı Oluştur
          </h4>
        </div>
        <div className="custom-scrollbar h-[650px] overflow-y-auto px-2 pb-3">
          <div className="mb-4 flex flex-col">
            <div>
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Genel Bilgiler
              </h5>
              {corporateOptions && individualOptions ? (
                <>
                  <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-1">
                    <Label>Müşteri Tipi</Label>
                    <CustomerSelector
                      corporateCustomers={corporateOptions.items}
                      individualCustomers={individualOptions.items}
                      defaultType="Individual"
                      defaultValueId={""}
                      error={!!errors.CustomerId}
                      hint={errors.CustomerId!}
                      onChange={(value, type) => {
                        if (type === "Individual") {
                          setFormData(
                            prev =>
                              ({
                                ...prev,
                                customerType: type,
                                customerId: value,
                              }) as ServiceAddModel,
                          );
                        }
                        if (type === "Corporate") {
                          setFormData(
                            prev =>
                              ({
                                ...prev,
                                customerType: type,
                                customerId: value,
                              }) as ServiceAddModel,
                          );
                        }
                      }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Servis Başlığı</Label>
                  <Input
                    type="text"
                    name="serviceTitle"
                    error={!!errors.ServiceTitle}
                    hint={errors.ServiceTitle!}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Servis Konusu</Label>
                  <Input
                    type="text"
                    name="serviceSubject"
                    error={!!errors.ServiceSubject}
                    hint={errors.ServiceSubject!}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-1">
                <div>
                  <Label>Servis Açıklaması</Label>
                  <TextArea
                    className="text-black dark:text-white"
                    error={!!errors.ServiceDescription}
                    hint={errors.ServiceDescription!}
                    value={formData?.serviceDescription}
                    onChange={value =>
                      setFormData(
                        prev =>
                          ({
                            ...prev,
                            serviceDescription: value,
                          }) as ServiceAddModel,
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Öncelik Durumu</Label>
                  <Select
                    id="y"
                    options={priortyData}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: !!errors.Priority ? "red" : base.borderColor,
                      }),
                    }}
                    getOptionLabel={e => e.label}
                    getOptionValue={e => e.value}
                    onChange={value =>
                      setFormData(prev => ({ ...prev, priority: value?.value }) as ServiceAddModel)
                    }
                    placeholder={"Öncelik Durumu Seçiniz"}
                  />
                  {!!errors.Priority && (
                    <p className="mt-1 text-sm text-red-500">{errors.Priority}</p>
                  )}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1"></div>

              <div className="mt-4">
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Servis Bölge Bilgileri
                </h5>
              </div>

              <CityStateSelect
                className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"
                onChange={data =>
                  setFormData(
                    prev =>
                      ({
                        ...prev,
                        cityId: data.city?.id,
                        cityName: data.city?.name,
                        districtId: data.state?.id,
                        districtName: data.state?.name,
                        lat: data.state ? data.state.lat : data.city ? data.city.lat : null,
                        lon: data.state ? data.state.lon : data.city ? data.city.lon : null,
                      }) as ServiceAddModel,
                  )
                }
              />
              {formData?.districtName ? (
                <>
                  <Label>Açık Adres</Label>
                  <Input
                    type="text"
                    name="navigationUrl"
                    onChange={e =>
                      setFormData(
                        prev =>
                          ({
                            ...prev,
                            navigationUrl: getGoogleMapsLink(
                              e.target.value,
                              prev!.cityName,
                              prev!.districtName,
                            ),
                          }) as ServiceAddModel,
                      )
                    }
                  />
                </>
              ) : (
                <></>
              )}
              <div></div>

              <div className="mt-4">
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Ekip-Personel Atama Bilgileri
                </h5>
                {teamOptions && personelOptions ? (
                  <>
                    {" "}
                    <AssignmentSelector
                      teamList={teamOptions.items}
                      personnelList={personelOptions.items}
                      onChange={(value, type) => {
                        if (type === "personel") {
                          setFormData(
                            prev =>
                              ({
                                ...prev,
                                personelId: value,
                                teamId: "",
                              }) as ServiceAddModel,
                          );
                        }
                        if (type === "team") {
                          setFormData(
                            prev =>
                              ({
                                ...prev,
                                teamId: value,
                                personelId: "",
                              }) as ServiceAddModel,
                          );
                        }
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Kapat
          </Button>
          <Button size="sm" onClick={handleSave}>
            Oluştur
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default ServiceAddForm;
