import { useEffect, useState } from "react";
import Select from "react-select";

import { CorporateCustomerSelectModel } from "@/features/customer/corporate/model/corporateCustomer";
import { IndividualCustomerSelectModel } from "@/features/customer/individual/model/IndividualCustomer";

interface Props {
  corporateCustomers: CorporateCustomerSelectModel[];
  individualCustomers: IndividualCustomerSelectModel[];
  defaultType?: string;
  defaultValueId?: string;
  onChange: (selectedId: string, type: string) => void;
  error?: boolean;
  hint?: string;
}

export function CustomerSelector({
  corporateCustomers,
  individualCustomers,
  defaultType = "Individual",
  defaultValueId,
  onChange,
  error,
  hint,
}: Props) {
  const [type, setType] = useState<string>(defaultType);
  const [selectedId, setSelectedId] = useState<string | null>(defaultValueId ?? "");

  const customers = type === "Corporate" ? corporateCustomers : individualCustomers;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = customers.map((c: any) => ({
    value: c.id.toString(),
    label: c.companyName ? c.companyName : `${c?.firstName} ${c.lastName}`,
  }));

  const selectedOption = options.find(o => o.value === selectedId) ?? null;

  useEffect(() => {
    // defaultType veya defaultValueId ilk render'da varsa onları setle
    setType(defaultType);
    setSelectedId(defaultValueId ?? "");
  }, [defaultType, defaultValueId]);

  useEffect(() => {
    // müşteri tipi değiştiğinde mevcut id bu listede yoksa sıfırla
    const exists = customers.some(c => c.id.toString() === selectedId);
    if (!exists) {
      setSelectedId("");
      onChange("", type);
    } else if (selectedId) {
      // eğer hala varsa da bir kez onChange tetikle
      onChange(selectedId, type);
    }
  }, [type, customers]);

  const handleChange = (option: { value: string; label: string } | null) => {
    const id = option?.value ?? "";
    setSelectedId(id);
    onChange(id, type);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 dark:text-gray-400">
          <input
            type="radio"
            checked={type === "Individual"}
            onChange={() => setType("Individual")}
          />
          Bireysel
        </label>
        <label className="flex items-center gap-2 dark:text-gray-400">
          <input
            type="radio"
            checked={type === "Corporate"}
            onChange={() => setType("Corporate")}
          />
          Kurumsal
        </label>
      </div>

      <Select
        className="min-w-[250px]"
        isClearable
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Müşteri seçiniz..."
        styles={{
          control: base => ({
            ...base,
            borderColor: error ? "red" : base.borderColor,
          }),
        }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{hint}</p>}
    </div>
  );
}
