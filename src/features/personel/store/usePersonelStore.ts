import { create } from "zustand";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { Listed } from "@/core/network/api-results/Listed";
import { Paginated } from "@/core/network/api-results/Paginated";
import {
  PersonelModel,
  PersonelSelectModel,
  PersonelUpdateModel,
} from "@/features/personel/model/personel";
import {
  GetAllPersonel,
  GetByIdPersonel,
  GetListByDynamicPersonel,
  GetListPersonel,
} from "@/features/personel/service/personelService";

interface PersonelState {
  personels: Paginated<PersonelModel> | null;
  fetchPersonels: (pageIndex: number, pageSize: number) => Promise<void>;
  personel: PersonelModel | null;
  fetchPersonel: (id: string | undefined) => Promise<void>;
  personelOptions: Listed<PersonelSelectModel> | null;
  fetchPersonelOptions: () => Promise<void>;
  updateFormData: PersonelUpdateModel;
  setUpdateField: (field: keyof PersonelUpdateModel, value: string) => void;
  setUpdateFormData: (data: PersonelUpdateModel) => void;

  isLoading: boolean;
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;

  setIsDynamic: (value: boolean) => void;
  setDynamicQuery: (query: DynamicQuery | null) => void;
}

export const usePersonelStore = create<PersonelState>((set, get) => ({
  personels: null,
  personel: null,
  personelOptions: null,
  isLoading: false,
  isDynamic: false,
  dynamicQuery: null,

  fetchPersonels: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { isDynamic, dynamicQuery } = get();

      const data =
        isDynamic && dynamicQuery
          ? await GetListByDynamicPersonel(pageIndex, pageSize, dynamicQuery)
          : await GetListPersonel(pageIndex, pageSize);

      set({ personels: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPersonel: async id => {
    set({ isLoading: true });
    try {
      const data = await GetByIdPersonel(id!);

      set({ personel: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPersonelOptions: async () => {
    set({ isLoading: true });
    try {
      const data = await GetAllPersonel();
      set({ personelOptions: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateFormData: {
    id: "",
    birthDate: "",
    createAt: "",
    department: "",
    email: "",
    firstName: "",
    hireDate: "",
    imgUrl: "",
    isActive: true,
    jobTitle: "",
    lastName: "",
    personelCode: "",
    phoneNumber: "",
    updateAt: "",
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
