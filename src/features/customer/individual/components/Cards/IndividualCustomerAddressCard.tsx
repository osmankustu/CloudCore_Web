import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/core/hooks/useModal";

type Address = {
  id: string;
  country: string;
  city: string;
  postalCode: string;
  taxId: string;
};

const IndividualCustomerAddressCard = () => {
  const { closeModal } = useModal();
  const mockAddresses: Address[] = [
    {
      id: "1",
      country: "Türkiye",
      city: "Antalya, Konyaaltı",
      postalCode: "07070",
      taxId: "TAX-123456",
    },
    {
      id: "2",
      country: "Türkiye",
      city: "İstanbul, Kadıköy",
      postalCode: "34710",
      taxId: "TAX-654321",
    },
  ];
  const [addresses] = useState<Address[]>(mockAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [isModalOpen, setModalOpen] = useState(false);

  const openAddModal = () => {
    setSelectedAddress(undefined);
    setModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setSelectedAddress(address);
    setModalOpen(true);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <>
      <div className="mt-5 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
              Adres Bilgileri
            </h4>

            <div className="flex flex-wrap gap-4">
              {addresses.map(address => (
                <div
                  key={address.id}
                  onClick={() => openEditModal(address)}
                  className="w-[300px] cursor-pointer rounded-xl border border-gray-200 p-8 transition hover:shadow dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    Ülke: {address.country}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Şehir/İlçe: {address.city}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Posta Kodu: {address.postalCode}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Vergi No: {address.taxId}
                  </p>
                </div>
              ))}

              {/* Add New Card */}
              <div
                onClick={openAddModal}
                className="flex w-[300px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-4 text-center text-gray-500 transition hover:border-blue-400 hover:text-blue-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-500"
              >
                <FaPlus size={32} />
                <span>Yeni Adres Ekle</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} className="m-4 max-w-[700px]">
        <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {selectedAddress ? "Adresi Güncelle" : "Yeni Adres Ekle"}
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar overflow-y-auto px-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Ülke</Label>
                  <Input type="text" defaultValue={selectedAddress?.country || ""} />
                </div>

                <div>
                  <Label>Şehir/İlçe</Label>
                  <Input type="text" defaultValue={selectedAddress?.city || ""} />
                </div>

                <div>
                  <Label>Posta Kodu</Label>
                  <Input type="text" defaultValue={selectedAddress?.postalCode || ""} />
                </div>

                <div>
                  <Label>Vergi No</Label>
                  <Input type="text" defaultValue={selectedAddress?.taxId || ""} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={() => setModalOpen(false)}>
                Kapat
              </Button>
              <Button size="sm" onClick={handleSave}>
                Kaydet
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default IndividualCustomerAddressCard;
