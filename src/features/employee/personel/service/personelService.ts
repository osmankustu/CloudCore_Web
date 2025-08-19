import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";

import { PersonelAddModel, PersonelUpdateModel } from "../model/personel";

export async function AddPersonel(model: PersonelAddModel) {
  try {
    const res = await axiosInstance.post("/personels", model);
    return res;
  } catch (error) {
    console.error("Error adding personel :", error);
    throw error;
  }
}

export async function UpdatePersonel(model: PersonelUpdateModel) {
  try {
    const res = await axiosInstance.put("/personels", model);
    return res;
  } catch (error) {
    console.error("Error updating personel :", error);
    throw error;
  }
}

export async function DeletePersonel(id: string) {
  try {
    const res = await axiosInstance.delete("/personels/" + id);
    return res.data;
  } catch (error) {
    console.error("Error delete personel :", error);
    throw error;
  }
}

export async function GetListPersonel(pageIndex: number, pageSize: number) {
  try {
    const res = await axiosInstance.get(
      "/personels?PageIndex=" + pageIndex + "&PageSize=" + pageSize,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching personel:", error);
    throw error;
  }
}

export async function GetListByDynamicPersonel(
  pageIndex: number,
  pageSize: number,
  dynamicQuery: DynamicQuery,
) {
  try {
    const res = await axiosInstance.post(
      "/personels/get-list/by-dynamic?PageIndex=" + pageIndex + "&PageSize=" + pageSize,
      dynamicQuery,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching personel:", error);
    throw error;
  }
}

export async function GetAllPersonel() {
  try {
    const res = await axiosInstance.get("/personels/get-list/for-select");
    return res.data;
  } catch (error) {
    console.error("Error fetching personel:", error);
    throw error;
  }
}

export async function GetByIdPersonel(id: string) {
  try {
    const res = await axiosInstance.get("/personels/" + id);
    return res.data;
  } catch (error) {
    console.error("Error fetching personel with id :", error);
    throw error;
  }
}

export async function getPersonelByTeamId(id: number) {
  try {
    const res = await axiosInstance.get("/personels/" + id + "/team");
    return res.data;
  } catch (error) {
    console.error("Error fetching personel with teamId :", error);
    throw error;
  }
}

export async function UploadPersonelProfileImage(model: unknown) {
  try {
    const res = await axiosInstance.post("/storage/upload-profile", model, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  } catch (error) {
    console.error("Error adding personel Image  :", error);
    throw error;
  }
}
