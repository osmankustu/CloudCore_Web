import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { useRequestAction } from "@/core/hooks/useRequestAction";
import { GetAllCities } from "@/features/auth/service/authService";

type State = {
  id: number;
  name: string;
  lat: number | null;
  lon: number | null;
};

export type City = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

type Option = { value: number; label: string };

type Props = {
  defaultCityId?: number;
  defaultStateId?: number;
  onChange?: (data: { city: City | undefined; state: State | undefined }) => void;
  className?: string;
};

export default function CityStateSelect({
  defaultCityId,
  defaultStateId,
  onChange,
  className = "",
}: Props) {
  const { run } = useRequestAction();

  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>();
  const [selectedState, setSelectedState] = useState<State>();

  // Şehirleri getir
  useEffect(() => {
    run(async () => {
      const cityResult = await GetAllCities();
      setCities(cityResult.items);

      if (defaultCityId) {
        const city = cityResult.items.find((c: City) => c.id === defaultCityId);
        setSelectedCity(city);
      }
    });
  }, []);

  // İlçeleri getir
  useEffect(() => {
    if (!selectedCity) {
      setStates([]);
      setSelectedState(undefined);
      return;
    }

    run(async () => {
      const stateResult = await GetAllCities(selectedCity.id);
      setStates(stateResult.items);

      if (defaultStateId) {
        const state = stateResult.items.find((s: State) => s.id === defaultStateId);
        setSelectedState(state);
      }
    });
  }, [selectedCity?.id]);

  // Dışarı bildir
  useEffect(() => {
    onChange?.({ city: selectedCity, state: selectedState });
  }, [selectedCity, selectedState]);

  const cityOptions: Option[] = useMemo(
    () => cities.map(c => ({ value: c.id, label: c.name })),
    [cities],
  );

  const stateOptions: Option[] = useMemo(
    () => states.map(s => ({ value: s.id, label: s.name })),
    [states],
  );

  return (
    <div className={className}>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium dark:text-gray-400">Şehir</label>
        <Select
          options={cityOptions}
          value={selectedCity ? { value: selectedCity.id, label: selectedCity.name } : null}
          onChange={option => {
            const city = cities.find(c => c.id === option?.value);
            setSelectedCity(city);
            setSelectedState(undefined); // ilçe sıfırlanmalı
          }}
          placeholder="Şehir seçiniz"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium dark:text-gray-400">İlçe</label>
        <Select
          options={stateOptions}
          value={selectedState ? { value: selectedState.id, label: selectedState.name } : null}
          onChange={option => {
            const state = states.find(s => s.id === option?.value);
            setSelectedState(state);
          }}
          placeholder="İlçe seçiniz"
          isDisabled={!selectedCity}
        />
      </div>
    </div>
  );
}
