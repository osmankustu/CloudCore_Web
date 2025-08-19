import { BaseModel } from "@/core/models/base-model";

export interface UserOperationClaimAddModel {
  userId: string;
  operationClaimId: number;
}

export interface UserOperationClaimsModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
  label?: string;
}

export interface UserOperationClaimModel extends BaseModel {
  name: string;
  label: string;
}
