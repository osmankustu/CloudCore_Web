import { BaseModel } from "@/core/models/base-model";

export interface AssignmentModel extends BaseModel {
  personelId: string;
  teamId: string;
  personelFirstName: string;
  personelLastName: string;
  teamName: string;
}
