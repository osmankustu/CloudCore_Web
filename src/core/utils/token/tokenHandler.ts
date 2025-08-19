import jwt, { JwtPayload } from "jsonwebtoken";
import nookies from "nookies";

import {
  GetClaimName,
  GetNameidentifier,
  GetPersonelId,
  GetRoleClaims,
} from "../claims/claimExtension";

export function GetTokenInIdentityId(): string {
  const token = GetToken();
  const decodedToken = DecodeJwt(token!);
  return GetNameidentifier(decodedToken);
}

export function GetTokenInPersonelId() {
  const token = GetToken();
  const decodedToken = DecodeJwt(token!);
  return GetPersonelId(decodedToken);
}

export function GetTokenInPersonelNameAndSureName() {
  const token = GetToken();
  const decodedToken = DecodeJwt(token!);

  return GetClaimName(decodedToken);
}

export function GetUserRoles() {
  const token = GetToken();
  const decodedToken = DecodeJwt(token!);

  return GetRoleClaims(decodedToken);
}

// export function GetTokenExpTime(){
//     var token = GetToken();
//     var decodedToken = DecodeJwt(token!);

//     return GetExpTime(decodedToken);
// }

export function DecodeJwt(token: string): JwtPayload {
  const decoded = jwt.decode(token) as JwtPayload;

  return decoded;
}

export function GetToken() {
  try {
    const cookies = nookies.get(undefined, "token");
    return cookies.token;
  } catch (error) {
    console.log(error);
  }
}

export function SetToken(token: string) {
  nookies.set(undefined, "token", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: false,
    maxAge: 60 * 60,
  });
}

export function SetRoles(roles: string[]) {
  localStorage.setItem("roles", JSON.stringify(roles));
}

export function GetRefreshToken() {
  const cookies = nookies.get(undefined, "refreshToken");
  return cookies.refreshToken;
}

export function RemoveToken() {
  nookies.destroy(undefined, "token");
}
