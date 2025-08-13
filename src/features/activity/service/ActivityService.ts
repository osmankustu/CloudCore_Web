import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";

import { ActivityAddModel, ActivityUpdateModel } from "../model/Activity";

export async function GetListByPoolIdActivity(poolId: string) {
  try {
    const res = await axiosInstance.get("/activity/get-list/by-pool-id/" + poolId);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListActivity(pageSize: number, pageIndex: number) {
  try {
    const res = await axiosInstance.get(`/activity?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListByDynamicActivity(
  pageSize: number,
  pageIndex: number,
  dynamicQuery: DynamicQuery,
) {
  try {
    const res = await axiosInstance.post(
      `/activity/get-list/by-dynamic?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      dynamicQuery,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function AddActivity(model: ActivityAddModel) {
  try {
    const res = await axiosInstance.post("/activity", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function UpdateActivity(model: ActivityUpdateModel) {
  try {
    const res = await axiosInstance.put("/activity", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function DeleteActivity(activityId: string) {
  try {
    const res = await axiosInstance.delete("/activity/" + activityId);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function GetByIdActivity(activityId: string) {
  try {
    const res = await axiosInstance.get("/activity/" + activityId);
    return res.data;
  } catch (error) {
    throw error;
  }
}
