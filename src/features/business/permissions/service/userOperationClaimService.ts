import axiosInstance from "@/core/network/axiosInstance";
import { UserOperationClaimAddModel } from "../model/userOperationClaim";

export async function getAllUserOperationClaims() {
  try {
    const res = axiosInstance.get("/user/get-user-roles");
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUserRoles(userId: string) {
  try {
    const res = axiosInstance.get("/claims/get-list/by-user-id/" + userId);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(userId: string) {
  try {
    const res = axiosInstance.get("/user/" + userId);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserClaims(model: UserOperationClaimAddModel) {
  try {
    const res = axiosInstance.post("/claims", model);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserClaims(userOperationClaimId: string) {
  try {
    const res = axiosInstance.delete("/claims/" + userOperationClaimId);
    return res;
  } catch (error) {
    console.log(error);
  }
}
