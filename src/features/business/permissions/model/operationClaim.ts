export interface OperationClaimModel {
  id: number;
  name: string;
  label?: string;
  description?: string;
}

export interface UserOperationClaim {
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
