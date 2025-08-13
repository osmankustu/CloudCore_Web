import axiosInstance from "@/core/network/axiosInstance";

export async function GetByServiceRecordIdAssignment(id: string) {
  try {
    const res = await axiosInstance.get(`/assignments/get-by-id/by-service-record-id/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
