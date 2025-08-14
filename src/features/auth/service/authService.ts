import axiosInstance from "@/core/network/axiosInstance";
import { GetRefreshToken } from "@/core/utils/token/tokenHandler";

import { LoginModel } from "../model/LoginModel";
import { appLogger } from "@/core/utils/logger/logger";

export async function LoginForApp(loginModel: LoginModel) {
  try {
    const res = await axiosInstance.post("/auth/login", loginModel);
    if (res.status === 200) {
      appLogger.log("info", "Login successful", {
        userEmail: loginModel.email,
      });
    }
    return res;
  } catch (error: any) {
    appLogger.log("error", "Login", {
      message: error?.message || "Unknown error",
      stack: error?.stack,
      response: error?.response?.data, // Axios spesifik
      status: error?.response?.status,
    });
    throw error;
  }
}

export async function RefreshToken() {
  try {
    const res = await axiosInstance.get("/auth/refresh-token", { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Error Token Refresh transaction :", error);
    throw error;
  }
}

export async function RevokeToken() {
  const refreshToken = GetRefreshToken();
  try {
    const res = await axiosInstance.put("/auth/revoke-token", refreshToken);
    return res.data;
  } catch (error) {
    console.error("Error Revoke-Token transaction :", error);
    throw error;
  }
}

export async function EnableOTP() {
  try {
    const res = await axiosInstance.post("/auth/enable-otp");
    return res;
  } catch (error) {
    console.error("Error Enable OTP transaction :", error);
    throw error;
  }
}

export async function EnableEmail() {
  try {
    const res = await axiosInstance.post("/auth/enable-email");
    return res;
  } catch (error) {
    console.error("Error Enable email transaction", error);
    throw error;
  }
}

export async function VerifyOtp(code: string) {
  try {
    const res = await axiosInstance.post(`/auth/verify-otp?authenticatorCode=${code}`);
    return res;
  } catch (error) {
    console.error("Error Verify OTP transaction", error);
    throw error;
  }
}

export async function DisableOtp() {
  try {
    const res = await axiosInstance.post("/auth/disable-otp");
    return res;
  } catch (error) {
    console.error("Error Verify OTP transaction", error);
    throw error;
  }
}

export async function DisableEmail() {
  try {
    const res = await axiosInstance.post("/auth/disable-email");
    return res;
  } catch (error) {
    console.error("Error Verify OTP transaction", error);
    throw error;
  }
}

export async function GetAllCities(CityId?: number) {
  if (CityId) {
    try {
      const res = await axiosInstance.get(`/auth/address?CityId=${CityId}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching global address:", error);
      throw error;
    }
  }

  try {
    const res = await axiosInstance.get("/auth/address");
    return res.data;
  } catch (error) {
    console.error("Error fetching global address:", error);
    throw error;
  }
}
