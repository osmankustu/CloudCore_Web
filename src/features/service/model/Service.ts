import { BaseModel } from "@/core/models/base-model";

export interface ServiceModel extends BaseModel {
  recordCode: string;
  serviceTitle: string;
  serviceSubject: string;
  serviceDescription: string;
  priority: string;
  serviceStatus: string;
  customerName: string;
  navigationUrl: string;
  customerId: string;
  customerType: string;
  assignmentId: string;
  poolId: string;
  lat: number | null;
  lon: number | null;
  cityId: number;
  districtId: number;
  cityName: string;
  districtName: string;
}

export interface ServiceAddModel {
  serviceTitle: string;
  serviceSubject: string;
  serviceDescription: string;
  priority: string;
  navigationUrl: string;
  customerId: string;
  customerType?: string;
  personelId: string;
  teamId: string;
  lat: number;
  lon: number;
  cityId: number;
  districtId: number;
  cityName: string;
  districtName: string;
}

export interface ServiceUpdateModel {
  id: string;
  recordCode: string;
  serviceTitle: string;
  serviceSubject: string;
  serviceDescription: string;
  priority: string;
  navigationUrl: string;
  createAt: string;
  customerType: string;
  customerId: string;
  personelId?: string;
  teamId?: string;
  lat: number;
  lon: number;
  cityId: number;
  districtId: number;
  cityName: string;
  districtName: string;
}
