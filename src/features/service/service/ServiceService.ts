import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";

import { ServiceAddModel, ServiceUpdateModel } from "../model/Service";

export async function GetListService(pageIndex: number, pageSize: number = 20) {
  try {
    const res = await axiosInstance.get(
      "/services?PageIndex=" + pageIndex + "&PageSize=" + pageSize,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListByDynamicService(
  pageIndex: number,
  pageSize: number = 20,
  dynamicQuery: DynamicQuery,
) {
  try {
    const res = await axiosInstance.post(
      "/services/get-list/by-dynamic?PageIndex=" + pageIndex + "&PageSize=" + pageSize,
      dynamicQuery,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetByIdService(id: string) {
  try {
    const res = await axiosInstance.get("/services/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function AddService(model: ServiceAddModel) {
  try {
    const res = await axiosInstance.post("/services", model);
    return res;
  } catch (error) {
    console.error("Error add service records:", error);
    throw error;
  }
}

export async function UpdateService(model: ServiceUpdateModel) {
  try {
    const res = await axiosInstance.put("/services", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function DeleteService(id: string) {
  try {
    const res = await axiosInstance.delete("/services/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListServiceWithCompanyId(id: number, pageIndex: number, pageSize: number) {
  try {
    const res = await axiosInstance.get(
      "/services/paging-by-id?id=" + id + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
