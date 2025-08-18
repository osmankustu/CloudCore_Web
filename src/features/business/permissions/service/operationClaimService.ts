import axiosInstance from "@/core/network/axiosInstance";

export async function getAllOperationClaims() {
  try {
    const res = axiosInstance.get("/operations?pageIndex=0&pageSize=200");
    return res;
  } catch (error) {
    console.log(error);
  }
}
