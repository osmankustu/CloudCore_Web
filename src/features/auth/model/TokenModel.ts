export interface TokenModel {
  accessToken: {
    token: string;
    expirationDate: Date;
  };
  requiredAuthenticatorType: number;
}
