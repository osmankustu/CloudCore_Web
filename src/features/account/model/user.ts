export interface IdentityUserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  authenticatorType: number;
}

export interface IdentityUserChangePasswordModel {
  password: string;
  newPassword: string;
}
