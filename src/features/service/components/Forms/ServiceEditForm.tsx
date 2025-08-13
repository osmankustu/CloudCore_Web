import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Select from "react-select";

import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { priortyData } from "@/core/constants/constants.data";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { extractLocationFromMapUrl, getGoogleMapsLink } from "@/core/utils/mapsHelper";
import { showSuccess } from "@/core/utils/toastHelper";
import { useAssignmentStore } from "@/features/assignment/store/useAssignmentStore";
import { useCorporateCustomerStore } from "@/features/customer/corporate/store/useCorporateCustomerStore";
import { useIndividualCustomerStore } from "@/features/customer/individual/store/useIndividualCustomerStore";
import { usePersonelStore } from "@/features/personel/store/usePersonelStore";
import { useTeamStore } from "@/features/team/store/useTeamStore";

import { UpdateService } from "../../service/ServiceService";
import { useServiceStore } from "../../store/useServiceStore";
import { AssignmentSelector } from "../custom/AssignmentsSelector";
import CityStateSelect from "../custom/CitySelector";
import { CustomerSelector } from "../custom/CustomerSelector";

const ServiceEditForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter();
  const { run, isLoading } = useRequestAction();
  const { errors, clearErrors } = useFormErrors();
  const { personelOptions, fetchPersonelOptions } = usePersonelStore();
  const { teamOptions, fetchTeamOptions } = useTeamStore();
  const { individualOptions, fetchIndividualOptions } = useIndividualCustomerStore();
  const { corporateOptions, fetchCorporateOptions } = useCorporateCustomerStore();
  const { service, updateFormData, fetchService, setUpdateFormData, setUpdateField } =
    useServiceStore();
  const { assignment } = useAssignmentStore();

  useEffect(() => {
    run(async () => {
      fetchIndividualOptions();
      fetchCorporateOptions();
      fetchPersonelOptions();
      fetchTeamOptions();
    });
  }, []);

  useEffect(() => {
    if (service) {
      setUpdateFormData({
        cityId: service.cityId,
        cityName: service.cityName,
        customerId: service.customerId,
        customerType: service.customerType,
        districtId: service.districtId,
        districtName: service.districtName,
        lat: service.lat!,
        lon: service.lon!,
        navigationUrl: service.navigationUrl,
        personelId: assignment?.personelId,
        priority: service.priority,
        serviceDescription: service.serviceDescription,
        serviceSubject: service.serviceSubject,
        serviceTitle: service.serviceTitle,
        teamId: assignment?.teamId,
        createAt: service.createAt,
        id: service.id,
        recordCode: service.recordCode,
      });
    }
    clearErrors();
  }, [isOpen]);

  const handleSave = async () => {
    console.log(updateFormData);
    run(async () => {
      const response = await UpdateService(updateFormData);
      if (response.status === 200) {
        clearErrors();
        onClose();
        showSuccess("Servis Kaydı Güncellendi.");
        fetchService(service!.id);
      }
    });
  };
  return (
    <>
      <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Servis Kaydı Güncelle
            </h4>
          </div>

          <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
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
                        defaultType={updateFormData.customerType}
                        defaultValueId={updateFormData.customerId}
                        error={!!errors.CustomerId}
                        hint={errors.CustomerId!}
                        onChange={(value, type) => {
                          if (type === "individual") {
                            console.log(type);
                            setUpdateField("customerType", type);
                            setUpdateField("customerId", value);
                          }
                          if (type === "corporate") {
                            console.log(type);
                            setUpdateField("customerType", type);
                            setUpdateField("customerId", value);
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
                      value={updateFormData.serviceTitle}
                      error={!!errors.ServiceTitle}
                      hint={errors.ServiceTitle!}
                      onChange={e => setUpdateField("serviceTitle", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Servis Konusu</Label>
                    <Input
                      type="text"
                      name="serviceSubject"
                      value={updateFormData.serviceSubject}
                      error={!!errors.ServiceSubject}
                      hint={errors.ServiceSubject!}
                      onChange={e => setUpdateField("serviceSubject", e.target.value)}
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
                      value={updateFormData.serviceDescription}
                      onChange={value => setUpdateField("serviceDescription", value)}
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
                      value={priortyData.find(e => e.value === updateFormData.priority)}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(value: any) => setUpdateField("priority", value?.value)}
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

                {updateFormData ? (
                  <>
                    <CityStateSelect
                      className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"
                      defaultCityId={updateFormData.cityId}
                      defaultStateId={updateFormData.districtId}
                      onChange={data => {
                        setUpdateField("cityId", data.city?.id ?? "");
                        setUpdateField("cityName", data.city?.name ?? "");
                        setUpdateField("districtId", data.state?.id ?? "");
                        setUpdateField("districtName", data.state?.name ?? "");
                        setUpdateField("lat", data.state?.lat ?? data.city?.lat ?? null);
                        setUpdateField("lon", data.state?.lon ?? data.city?.lon ?? null);
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
                {updateFormData?.districtName ? (
                  <>
                    <Label>Açık Adres</Label>
                    <Input
                      type="text"
                      name="navigationUrl"
                      value={extractLocationFromMapUrl(updateFormData.navigationUrl)}
                      onChange={e => {
                        const adres = e.target.value;
                        const fullAdres = getGoogleMapsLink(
                          adres,
                          updateFormData.cityName!,
                          updateFormData.districtName!,
                        );
                        setUpdateField("navigationUrl", fullAdres);
                      }}
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

                  <AssignmentSelector
                    teamList={teamOptions ? teamOptions.items : []}
                    personnelList={personelOptions ? personelOptions.items : []}
                    defaultType={
                      assignment?.personelId ? "personel" : assignment?.teamId ? "team" : "none"
                    }
                    defaultId={
                      assignment?.personelId
                        ? assignment.personelId
                        : assignment?.teamId
                          ? assignment.teamId
                          : ""
                    }
                    onChange={(value, type) => {
                      if (type === "personel") {
                        setUpdateField("teamId", "");
                        setUpdateField("personelId", value);
                      }
                      if (type === "team") {
                        setUpdateField("personelId", "");
                        setUpdateField("teamId", value);
                      }
                    }}
                  />
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
      </div>
    </>
  );
};

export default ServiceEditForm;
