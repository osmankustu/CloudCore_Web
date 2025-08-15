import axiosInstance from "@/core/network/axiosInstance";

export async function GetAllOpenServiceLocations() {
  try {
    const res = await axiosInstance.get("/dashboards/get-all/open-service-locations");
    return res.data;
  } catch (error) {
    console.error("Error fetching service pool metric:", error);
    throw error;
  }
}

export async function GetAllOpenServices(pageIndex: number, pageSize: number) {
  try {
    const res = await axiosInstance.get(
      `/dashboards/get-list/open-services?PageIndex=${pageIndex}&PageSize=${pageSize}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching service pool metric:", error);
    throw error;
  }
}
