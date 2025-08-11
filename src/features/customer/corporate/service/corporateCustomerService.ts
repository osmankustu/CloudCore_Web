import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";

import {
  CorporateCustomerAddModel,
  CorporateCustomerUpdateModel,
} from "../model/corporateCustomer";

export async function AddCorporateCustomer(model: CorporateCustomerAddModel) {
  try {
    const res = await axiosInstance.post("customers/corporate", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function UpdateCorporateCustomer(model: CorporateCustomerUpdateModel) {
  try {
    const res = await axiosInstance.put("customers/corporate", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function DeleteCorporateCustomer(id: string) {
  try {
    const res = await axiosInstance.delete("customers/corporate/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListCorporateCustomer(pageIndex: number = 0, pageSize: number = 20) {
  try {
    const res = await axiosInstance.get(
      `customers/corporate?PageIndex=${pageIndex}&PageSize=${pageSize}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListByDynamicCorporateCustomer(
  pageIndex: number = 0,
  pageSize = 20,
  dynamicQuery: DynamicQuery,
) {
  try {
    const res = await axiosInstance.post(
      `customers/corporate/get-list/by-dynamic?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      dynamicQuery,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetAllCorporateCustomers() {
  try {
    const res = await axiosInstance.get("customers/corporate/get-list/for-select");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetByIdCorporateCustomer(id: string) {
  try {
    const res = await axiosInstance.get("customers/corporate/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}
