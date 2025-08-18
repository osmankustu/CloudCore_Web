import axiosInstance from "@/core/network/axiosInstance";

import { PersonelUpdateModel } from "../../employee/personel/model/personel";
import { IdentityUserChangePasswordModel } from "../model/user";

//For tanent based User query tenantId
// only tenant admin
export async function GetListUser() {
  try {
    const res = await axiosInstance.get("/user");
    return res.data;
  } catch (error) {
    console.error("get user for identity service", error);
  }
}

export async function UpdateFromAuth(model: IdentityUserChangePasswordModel) {
  try {
    const res = await axiosInstance.put("/user/from-auth", model);
    return res;
  } catch (error) {
    console.error("put user for identity service", error);
    throw error;
  }
}

export async function GetPersonelFromTenant() {
  try {
    const res = await axiosInstance.get("/personels/get-from-user");
    return res.data;
  } catch (error) {
    console.error("get user for identity service", error);
    throw error;
  }
}

export async function UpdatePersonelFromTenant(model: PersonelUpdateModel) {
  try {
    const res = await axiosInstance.put("/personels/from-user", model);
    return res;
  } catch (error) {
    console.error("get user for identity service", error);
    throw error;
  }
}

export async function GetIdentityUser() {
  try {
    const res = await axiosInstance.get("/user/get-from-auth");
    return res.data;
  } catch (error) {
    console.error("get user for identity service", error);
  }
}
