import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";
import { TeamAddModel, TeamUpdateModel } from "@/features/team/model/team";

export async function AddTeam(model: TeamAddModel) {
  try {
    const res = await axiosInstance.post("/teams", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function UpdateTeam(model: TeamUpdateModel) {
  try {
    const res = await axiosInstance.put("/teams", model);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function DeleteTeam(id: string) {
  try {
    const res = await axiosInstance.delete("/teams/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListTeam(pageIndex: number, pageSize: number) {
  try {
    const res = await axiosInstance.get("/teams?PageIndex=" + pageIndex + "&PageSize=" + pageSize);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetListByDynamicTeam(
  pageIndex: number,
  pageSize: number,
  dynamicQuery: DynamicQuery,
) {
  try {
    const res = await axiosInstance.post(
      "/teams/get-list/by-dynamic?PageIndex=" + pageIndex + "&PageSize=" + pageSize,
      dynamicQuery,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetAllTeam() {
  try {
    const res = await axiosInstance.get("/teams/get-list/for-select");
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function GetByIdTeam(id: string) {
  try {
    const res = await axiosInstance.get("/teams/" + id);
    return res.data;
  } catch (error) {
    throw error;
  }
}
