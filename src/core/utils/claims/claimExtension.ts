interface TokenPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  TPId: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/name": string;
}

export function GetNameidentifier(token: object): string {
  const payload = token as TokenPayload;

  return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
}

export function GetPersonelId(token?: object): string {
  const payload = token as TokenPayload;

  return payload.TPId;
}

export function GetRoleClaims(token: object): string[] {
  const payload = token as TokenPayload;

  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}

export function GetClaimName(token: object): string {
  const payload = token as TokenPayload;

  return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/name"];
}
