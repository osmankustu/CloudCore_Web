import { BaseModel } from "@/core/models/base-model";

export interface OpenServiceLocationModel {
  name: string;
  totalServiceCount: number;
  states: state[];
  lat: number;
  lon: number;
}

interface state {
  name: string;
  serviceCount: number;
  lat: number;
  lon: number;
}

export interface OpenServiceModel extends BaseModel {
  recordCode: string;
  serviceDescription: string;
  priority: string;
  serviceStatus: string;
  customerName: string;
  customerId: string;
}
