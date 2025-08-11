import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";

import {
  IndividualCustomerAddModel,
  IndividualCustomerUpdateModel,
} from "../model/IndividualCustomer";

export async function AddIndividualCustomer(model: IndividualCustomerAddModel) {
  try {
    const res = await axiosInstance.post("customers/individual", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function UpdateIndividualCustomer(model: IndividualCustomerUpdateModel) {
  try {
    const res = await axiosInstance.put("customers/individual", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function DeleteIndividualCustomer(id: string) {
  try {
    const res = await axiosInstance.delete("customers/individual/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListIndividualCustomer(pageIndex: number = 0, pageSize: number = 20) {
  try {
    const res = await axiosInstance.get(
      `customers/individual?PageIndex=${pageIndex}&PageSize=${pageSize}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListByDynamicIndividualCustomer(
  pageIndex: number = 0,
  pageSize = 20,
  dynamicQuery: DynamicQuery,
) {
  try {
    const res = await axiosInstance.post(
      `customers/individual/get-list/by-dynamic?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      dynamicQuery,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetAllIndividualCustomers() {
  try {
    const res = await axiosInstance.get("customers/individual/get-list/for-select");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetByIdIndividualCustomer(id: string) {
  try {
    const res = await axiosInstance.get("customers/individual/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getAddress() {
  try {
    const res = await axiosInstance.get("/address/");
    return res.data;
  } catch (error) {
    throw error;
  }
}
