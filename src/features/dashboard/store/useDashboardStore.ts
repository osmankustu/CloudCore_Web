import { Listed } from "@/core/network/api-results/Listed";
import { create } from "zustand";
import { OpenServiceLocationModel, OpenServiceModel } from "../model/Dashboard";
import { Paginated } from "@/core/network/api-results/Paginated";
import { GetAllOpenServiceLocations, GetAllOpenServices } from "../service/DashboardService";

interface DashboardState {
  openServiceLocations: Listed<OpenServiceLocationModel> | null;
  fetchOpenServiceLocations: () => Promise<void>;
  openServices: Paginated<OpenServiceModel> | null;
  fetchOpenServices: (pageIndex: number, pageSize: number) => Promise<void>;

  isLoading: boolean;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  openServiceLocations: null,
  openServices: null,
  isLoading: false,

  fetchOpenServiceLocations: async () => {
    set({ isLoading: true });
    try {
      const data = await GetAllOpenServiceLocations();

      set({ openServiceLocations: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchOpenServices: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const data = await GetAllOpenServices(pageIndex, pageSize);

      set({ openServices: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
