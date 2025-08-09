"use client";
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";

import Checkbox from "@/components/form/input/Checkbox";
import { DynamicQuery, FilterField, Operator, SortItem } from "@/core/models/requests/DynamicQuery";

import Button from "../ui/button/Button";

interface FilterItem {
  field: string;
  operator: string;
  caseSensitive: boolean | null;
  type: "string" | "date" | "number" | "enum" | "";
  value: string;
  from?: string;
  to?: string;
}

interface EnumOption {
  label: string;
  value: string;
}

interface SortOption {
  label: string;
  value: "asc" | "desc";
}

interface Props {
  filteredFields: Array<FilterField>;
  onApply: (dynamicQuery: DynamicQuery) => void;
  clearFilter: (status: boolean) => void;
}

const FilteredByIdQueryCard: React.FC<Props> = ({ filteredFields, onApply, clearFilter }) => {
  const stringOperators: Operator[] = [
    { label: "Tam Eşleşen (Net Arama)", value: "eq" },
    { label: "Eşleşmeyen", value: "neq" },
    { label: "Boş (Null)", value: "isnull" },
    { label: "Boş olmayan (Not null)", value: "isnotnull" },
    { label: "Başlayan", value: "startswith" },
    { label: "Biten", value: "endswith" },
    { label: "İçeren (Arama)", value: "contains" },
    { label: "İçermeyen", value: "doesnotcontain" },
    { label: "İçinde", value: "in" },
  ];

  const dateOperators: Operator[] = [
    { label: "Boş (Null)", value: "isnull" },
    { label: "Boş olmayan (Not null)", value: "isnotnull" },
    { label: "Tarihler arasında", value: "between" },
  ];

  const numericOperators: Operator[] = [
    { label: "Tam Eşleşen", value: "eq" },
    { label: "Eşleşmeyen", value: "neq" },
    { label: "Küçükse", value: "lt" },
    { label: "Küçük veya eşitse", value: "lte" },
    { label: "Büyükse", value: "gt" },
    { label: "Büyük veya Eşitse", value: "gte" },
    { label: "İçeren", value: "contains" },
    { label: "İçermeyen", value: "doesnotcontain" },
    { label: "arasında", value: "between" },
  ];

  const enumOperators: Operator[] = [
    { label: "Tam Eşleşen (Net Arama)", value: "eq" },
    { label: "Boş (Null)", value: "isnull" },
    { label: "Boş olmayan (Not null)", value: "isnotnull" },
  ];

  const priorityEnum: EnumOption[] = [
    { label: "Düşük", value: "Düşük" },
    { label: "Orta", value: "Orta" },
    { label: "Yüksek", value: "Yüksek" },
  ];

  const serviceStatusEnum: EnumOption[] = [
    { label: "Oluşturuldu", value: "isCreated" },
    { label: "Beklemede", value: "isPending" },
    { label: "Başladı", value: "isStarted" },
    { label: "Devam Ediyor", value: "isContinue" },
    { label: "Kapatıldı (Tamamlandı)", value: "isClosed" },
  ];

  const sortDirections: SortOption[] = [
    { label: "Artan", value: "asc" },
    { label: "Azalan", value: "desc" },
  ];

  const [filters, setFilters] = useState<FilterItem[]>([
    {
      field: "",
      operator: "",
      type: "",
      value: "",
      from: "",
      to: "",
      caseSensitive: null,
    },
  ]);

  const [sorts, setSorts] = useState<SortItem[]>([]);
  const [canSensitive, setCanSensitive] = useState<boolean>(false);

  const handleFilterChange = (
    index: number,
    name: keyof FilterItem | "selectedValue",
    value: string | FilterField | Operator | EnumOption | null,
  ) => {
    setFilters(prev =>
      prev.map((f, i) => {
        if (i !== index) return f;

        if (name === "field" && value && typeof value !== "string" && "type" in value) {
          return { ...f, field: value.value, type: value.type as FilterItem["type"] };
        }
        if (name === "operator" && value && typeof value !== "string" && "value" in value) {
          return { ...f, operator: value.value };
        }
        if (name === "selectedValue" && value && typeof value !== "string" && "value" in value) {
          return { ...f, value: value.value };
        }
        if (typeof value === "string") {
          return { ...f, [name]: value };
        }
        return f;
      }),
    );
  };

  const handleSortsChange = (
    index: number,
    name: keyof SortItem,
    value: SingleValue<FilterField | SortOption>,
  ) => {
    setSorts(prev =>
      prev.map((s, i) => {
        if (i !== index) return s;
        if (name === "dir" && value && "value" in value) {
          return { ...s, dir: value.value as SortItem["dir"] };
        }
        if (name === "field" && value && "value" in value) {
          return { ...s, field: value.value };
        }
        return s;
      }),
    );
  };

  const addFilter = () => {
    setFilters(prev => [
      ...prev,
      { field: "", operator: "", value: "", type: "string", caseSensitive: false },
    ]);
  };

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index));
  };

  const addSort = () => {
    setSorts(prev => [...prev, { field: "", dir: "asc" }]);
  };

  const removeSort = (index: number) => {
    setSorts(prev => prev.filter((_, i) => i !== index));
  };

  const dropFilter = () => {
    setFilters([]);
    setSorts([]);
    clearFilter(true);
  };

  const handleDynamicQuery = () => {
    const mappedFilters = filters.map(f => {
      let value = f.value;
      if (f.operator === "between" && f.from && f.to) {
        const fromUTC = new Date(f.from).toISOString();
        const toUTC = new Date(f.to).toISOString();
        value = `${fromUTC},${toUTC}`;
      }
      return { ...f, value, from: undefined, to: undefined };
    });

    const dynamicQuery: DynamicQuery = {
      sort: sorts,
      filter: { filters: mappedFilters },
    };

    onApply(dynamicQuery);
  };

  return (
    <div className="mb-3 rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Filters */}
      <div className="flex w-full gap-4 p-4">
        <div className="flex w-full flex-col gap-1">
          {filters.map((filter, index) => (
            <div key={index} className="flex gap-3 rounded bg-green-100 p-1">
              {/* Field Select */}
              <Select<FilterField>
                className="w-1/5"
                name="field"
                options={filteredFields}
                getOptionLabel={f => f.label}
                getOptionValue={f => f.value}
                onChange={selected => handleFilterChange(index, "field", selected)}
                placeholder="Alan Seçiniz"
              />

              {/* Operator Select */}
              <Select<Operator>
                className="w-1/4"
                name="operator"
                options={
                  filter.type === "string"
                    ? stringOperators
                    : filter.type === "date"
                      ? dateOperators
                      : filter.type === "number"
                        ? numericOperators
                        : filter.type === "enum"
                          ? enumOperators
                          : []
                }
                getOptionLabel={op => op.label}
                getOptionValue={op => op.value}
                onChange={selected => handleFilterChange(index, "operator", selected)}
                placeholder="Arama Kriteri"
              />

              {/* String input */}
              {filter.type === "string" &&
                filter.operator !== "isnull" &&
                filter.operator !== "isnotnull" && (
                  <input
                    type="text"
                    value={filter.value}
                    onChange={e => handleFilterChange(index, "value", e.target.value)}
                    className="w-1/5 rounded border px-3 py-2 text-sm dark:bg-gray-800"
                    placeholder="Değer girin"
                  />
                )}

              {/* Enum Select */}
              {filter.type === "enum" &&
                filter.operator !== "isnull" &&
                filter.operator !== "isnotnull" && (
                  <Select<EnumOption>
                    name="selectedValue"
                    options={
                      filter.field === "Priority"
                        ? priorityEnum
                        : filter.field === "ServicePool.ServiceStatus"
                          ? serviceStatusEnum
                          : []
                    }
                    getOptionLabel={f => f.label}
                    getOptionValue={f => f.value}
                    onChange={selected => handleFilterChange(index, "selectedValue", selected)}
                    placeholder="Seçenek Seçiniz"
                  />
                )}

              {filters.length > 1 && (
                <button onClick={() => removeFilter(index)} className="w-1/12 text-red-500">
                  Sil
                </button>
              )}
            </div>
          ))}

          <Button onClick={addFilter} size="sm" variant="primary">
            Filtre Ekle
          </Button>
        </div>

        {/* Sorts */}
        <div className="flex w-1/3 flex-col gap-1">
          {sorts.map((sort, index) => (
            <div key={index} className="flex gap-3 rounded p-1">
              <Select<FilterField>
                name="field"
                options={filteredFields}
                getOptionLabel={f => f.label}
                getOptionValue={f => f.value}
                onChange={selected => handleSortsChange(index, "field", selected)}
              />
              <Select<SortOption>
                name="dir"
                options={sortDirections}
                getOptionLabel={f => f.label}
                getOptionValue={f => f.value}
                onChange={selected => handleSortsChange(index, "dir", selected)}
              />
              <button onClick={() => removeSort(index)} className="text-red-500">
                Sil
              </button>
            </div>
          ))}
          <Button onClick={addSort} size="sm" variant="primary">
            Sıralama Ekle
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={canSensitive}
          onChange={() => setCanSensitive(prev => !prev)}
          label="Büyük/küçük harf duyarlı"
        />
        {filters[0]?.field && (
          <button
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50"
            onClick={dropFilter}
          >
            Temizle
          </button>
        )}
        <Button onClick={handleDynamicQuery} variant="primary" disabled={!filters[0]?.value}>
          Uygula
        </Button>
      </div>
    </div>
  );
};

export default FilteredByIdQueryCard;
