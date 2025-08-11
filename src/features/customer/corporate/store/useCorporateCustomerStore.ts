import { create } from "zustand";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { Listed } from "@/core/network/api-results/Listed";
import { Paginated } from "@/core/network/api-results/Paginated";

import {
  CorporateCustomerModel,
  CorporateCustomerSelectModel,
  CorporateCustomerUpdateModel,
} from "../model/corporateCustomer";
import {
  GetAllCorporateCustomers,
  GetByIdCorporateCustomer,
  GetListByDynamicCorporateCustomer,
  GetListCorporateCustomer,
} from "../service/corporateCustomerService";

interface CorporateCustomerState {
  corporateCustomers: Paginated<CorporateCustomerModel> | null;
  fetchCorporateCustomers: (pageIndex: number, pageSize: number) => Promise<void>;
  corporateCustomer: CorporateCustomerModel | null;
  fetchCorporateCustomer: (id: string) => Promise<void>;
  corporateOptions: Listed<CorporateCustomerSelectModel> | null;
  fetchCorporateOptions: () => Promise<void>;
  updateFormData: CorporateCustomerUpdateModel;
  setUpdateField: (field: keyof CorporateCustomerUpdateModel, value: string) => void;
  setUpdateFormData: (data: CorporateCustomerUpdateModel) => void;

  isLoading: boolean;
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;

  setIsDynamic: (value: boolean) => void;
  setDynamicQuery: (query: DynamicQuery | null) => void;
}

export const useCorporateCustomerStore = create<CorporateCustomerState>((set, get) => ({
  corporateCustomers: null,
  corporateCustomer: null,
  corporateOptions: null,
  isLoading: false,
  isDynamic: false,
  dynamicQuery: null,

  fetchCorporateCustomers: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { isDynamic, dynamicQuery } = get();

      const data =
        isDynamic && dynamicQuery
          ? await GetListByDynamicCorporateCustomer(pageIndex, pageSize, dynamicQuery)
          : await GetListCorporateCustomer(pageIndex, pageSize);

      set({ corporateCustomers: data });
    } catch (error) {
      // example usage Logger.w()
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCorporateCustomer: async id => {
    set({ isLoading: true });
    try {
      const data = await GetByIdCorporateCustomer(id);

      set({ corporateCustomer: data });
    } catch (error) {
      // example usage Logger.w()
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCorporateOptions: async () => {
    set({ isLoading: true });
    try {
      const data = await GetAllCorporateCustomers();
      set({ corporateOptions: data });
    } catch (error) {
      // example usage Logger.w()
    } finally {
      set({ isLoading: false });
    }
  },

  updateFormData: {
    id: "",
    createAt: "",
    customerNo: "",
    email: "",
    authorizedEmail: "",
    authorizedPersonName: "",
    authorizedPhoneNumber: "",
    companyName: "",
    sector: "",
    taxNumber: "",
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
  setIsDynamic: val => set({ isDynamic: val }),
  setDynamicQuery: query => set({ dynamicQuery: query }),
}));
