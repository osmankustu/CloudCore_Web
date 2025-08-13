import { BaseModel } from "@/core/models/base-model";

export interface ActivityModel extends BaseModel {
  servicePoolId: string;
  updateDescription: string;
  serviceStatus: string;
  personelId: string;
  firstName: string;
  lastName: string;
}

export interface ActivityAddModel {
  servicePoolId: string;
  updateDescription: string;
  serviceStatus: string;
  personelId: string;
}

export interface ActivityUpdateModel {
  id: string;
  servicePoolId: string;
  updateDescription: string;
  serviceStatus: string;
  personelId: string;
  createAt: string;
}
