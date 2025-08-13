import { create } from "zustand";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { Paginated } from "@/core/network/api-results/Paginated";

import { ActivityModel, ActivityUpdateModel } from "../model/Activity";
import {
  GetByIdActivity,
  GetListActivity,
  GetListByDynamicActivity,
  GetListByPoolIdActivity,
} from "../service/ActivityService";

interface ActivityState {
  activities: Paginated<ActivityModel> | null;
  fetchActivities: (pageIndex: number, pageSize: number) => Promise<void>;
  poolActivities: Paginated<ActivityModel> | null;
  fetchPoolActivities: (poolId: string) => Promise<void>;
  activity: ActivityModel | null;
  fetchActivity: (id: string) => Promise<void>;
  updateFormData: ActivityUpdateModel;
  setUpdateField: (field: keyof ActivityUpdateModel, value: string) => void;
  setUpdateFormData: (data: ActivityUpdateModel) => void;

  isLoading: boolean;
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;

  setIsDynamic: (value: boolean) => void;
  setDynamicQuery: (query: DynamicQuery | null) => void;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: null,
  activity: null,
  poolActivities: null,
  isLoading: false,
  isDynamic: false,
  dynamicQuery: null,

  fetchActivities: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { isDynamic, dynamicQuery } = get();

      const data =
        isDynamic && dynamicQuery
          ? await GetListByDynamicActivity(pageIndex, pageSize, dynamicQuery)
          : await GetListActivity(pageIndex, pageSize);

      set({ activities: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPoolActivities: async (id: string) => {
    set({ isLoading: true });
    try {
      const data = await GetListByPoolIdActivity(id);

      set({ poolActivities: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchActivity: async id => {
    set({ isLoading: true });
    try {
      const data = await GetByIdActivity(id);

      set({ activity: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateFormData: {
    id: "",
    personelId: "",
    createAt: "",
    servicePoolId: "",
    serviceStatus: "",
    updateDescription: "",
  },

  setUpdateField: (field, value) => {
    set(state => ({
      updateFormData: {
        ...state.updateFormData,
        [field]: value,
      },
    }));
  },

  setUpdateFormData: data => set({ updateFormData: data }),
  setIsDynamic: val => set({ isDynamic: val }),
  setDynamicQuery: query => set({ dynamicQuery: query }),
}));
