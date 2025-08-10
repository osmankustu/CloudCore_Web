import { BaseModel } from "@/core/models/base-model";
import { PersonelModel } from "@/features/personel/model/personel";

export interface TeamModel extends BaseModel {
  teamCode: string;
  name: string;
  personelCount: string;
  isActive: boolean;
  personels: PersonelModel[];
}

export interface TeamSelectModel {
  id: string;
  name: string;
  teamCode: string;
}

export interface TeamAddModel {
  name: string;
  personelIds: string[];
}

export interface TeamUpdateModel {
  id: string;
  name: string;
  personelIds: string[];
  createAt: string;
  isActive: boolean;
  teamCode: string;
}
