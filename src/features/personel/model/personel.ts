import { BaseModel } from "@/core/models/base-model";

export interface PersonelModel extends BaseModel {
  personelCode: string;
  imgUrl: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  hireDate: string;
  jobTitle: string;
  department: string;
  isActive: boolean;
}

export interface PersonelSelectModel {
  id: string;
  firstName: string;
  lastName: string;
  personelCode: string;
}

export interface PersonelAddModel {
  imgUrl: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthDate: string | undefined;
  hireDate: string | undefined;
  isActive: boolean;
  jobTitle: string;
  department: string;
}

export interface PersonelUpdateModel {
  id: string;
  personelCode: string;
  imgUrl: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  hireDate: string;
  jobTitle: string;
  department: string;
  isActive: boolean;
  createAt: string;
  updateAt: string;
}
