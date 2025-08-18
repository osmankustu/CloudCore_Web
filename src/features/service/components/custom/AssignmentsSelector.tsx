import React, { useState } from "react";
import Select from "react-select";

import { PersonelSelectModel } from "@/features/employee/personel/model/personel";
import { TeamSelectModel } from "@/features/employee/team/model/team";

type Option = {
  value: string;
  label: string;
};

type AssignmentType = "personel" | "team" | "none";

type Props = {
  personnelList: PersonelSelectModel[];
  teamList: TeamSelectModel[];
  onChange: (selectedId: string | null, selectedType: AssignmentType) => void;
  defaultType?: AssignmentType;
  defaultId?: string;
};

export const AssignmentSelector: React.FC<Props> = ({
  personnelList,
  teamList,
  onChange,
  defaultType = "none",
  defaultId,
}) => {
  const [type, setType] = useState<AssignmentType>(defaultType);
  const [selectedId, setSelectedId] = useState<string | null>(defaultId ?? null);

  const handleTypeChange = (newType: AssignmentType) => {
    setType(newType);
    setSelectedId(null);
    onChange(null, newType);
  };

  const handleSelectChange = (option: Option | null) => {
    const id = option?.value ?? null;
    setSelectedId(id);
    onChange(id, type);
  };

  const getOptions = (): Option[] => {
    if (type === "personel") {
      return personnelList.map(
        p =>
          ({
            value: p?.id,
            label: p?.firstName + " " + p?.lastName + "  |" + p?.personelCode,
          }) as Option,
      );
    } else if (type === "team") {
      return teamList.map(t => ({ value: t?.id, label: t?.name + "   |" + t?.teamCode }) as Option);
    }
    return [];
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            name="assignmentType"
            value="personel"
            checked={type === "personel"}
            onChange={() => handleTypeChange("personel")}
          />
          Personel
        </label>
        <label>
          <input
            type="radio"
            name="assignmentType"
            value="team"
            checked={type === "team"}
            onChange={() => handleTypeChange("team")}
          />
          Ekip
        </label>
        <label>
          <input
            type="radio"
            name="assignmentType"
            value="none"
            checked={type === "none"}
            onChange={() => handleTypeChange("none")}
          />
          Atama Yok
        </label>
      </div>

      {type !== "none" ? (
        <Select
          options={getOptions()}
          value={getOptions().find(opt => opt.value === selectedId) || null}
          onChange={handleSelectChange}
          isClearable
          placeholder={`Bir ${type === "personel" ? "personel" : "ekip"} seçin`}
        />
      ) : (
        <div className="text-gray-500 italic">Herhangi bir atama yapılmadı.</div>
      )}
    </div>
  );
};
