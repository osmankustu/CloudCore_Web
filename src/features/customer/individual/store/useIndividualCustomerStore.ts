import { create } from "zustand";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { Listed } from "@/core/network/api-results/Listed";
import { Paginated } from "@/core/network/api-results/Paginated";

import {
  IndividualCustomerModel,
  IndividualCustomerSelectModel,
  IndividualCustomerUpdateModel,
} from "../model/IndividualCustomer";
import {
  GetAllIndividualCustomers,
  GetByIdIndividualCustomer,
  GetListByDynamicIndividualCustomer,
  GetListIndividualCustomer,
} from "../service/individualCustomerService";

interface IndividualCustomerState {
  individualCustomers: Paginated<IndividualCustomerModel> | null;
  fetchIndividualCustomers: (pageIndex: number, pageSize: number) => Promise<void>;
  individualCustomer: IndividualCustomerModel | null;
  fetchIndividualCustomer: (id: string) => Promise<void>;
  individualOptions: Listed<IndividualCustomerSelectModel> | null;
  fetchIndividualOptions: () => Promise<void>;
  updateFormData: IndividualCustomerUpdateModel;
  setUpdateField: (field: keyof IndividualCustomerUpdateModel, value: string) => void;
  setUpdateFormData: (data: IndividualCustomerUpdateModel) => void;

  isLoading: boolean;
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;

  setIsDynamic: (value: boolean) => void;
  setDynamicQuery: (query: DynamicQuery | null) => void;
}

export const useIndividualCustomerStore = create<IndividualCustomerState>((set, get) => ({
  individualCustomers: null,
  individualCustomer: null,
  individualOptions: null,
  isLoading: false,
  isDynamic: false,
  dynamicQuery: null,

  fetchIndividualCustomers: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { isDynamic, dynamicQuery } = get();
      const data =
        isDynamic && dynamicQuery
          ? await GetListByDynamicIndividualCustomer(pageIndex, pageSize, dynamicQuery)
          : await GetListIndividualCustomer(pageIndex, pageSize);

      set({ individualCustomers: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchIndividualCustomer: async id => {
    set({ isLoading: true });
    try {
      const data = await GetByIdIndividualCustomer(id);

      set({ individualCustomer: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchIndividualOptions: async () => {
    set({ isLoading: true });
    try {
      const data = await GetAllIndividualCustomers();
      set({ individualOptions: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateFormData: {
    id: "",
    createAt: "",
    customerNo: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
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
  setIsDynamic: value => set({ isDynamic: value }),
  setDynamicQuery: query => set({ dynamicQuery: query }),
}));
