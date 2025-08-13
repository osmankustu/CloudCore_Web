import { create } from "zustand";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { Listed } from "@/core/network/api-results/Listed";
import { Paginated } from "@/core/network/api-results/Paginated";
import { ActivityModel, ActivityUpdateModel } from "@/features/activity/model/Activity";
import {
  GetByIdActivity,
  GetListActivity,
  GetListByDynamicActivity,
} from "@/features/activity/service/ActivityService";

import { DocumentModel } from "../model/Document";
import { GetListByActivityIdDocument, GetListByRecordIdDocument } from "../service/DocumentService";

interface DocumentState {
  documents: Paginated<DocumentModel> | null;
  fetchDocuments: (pageIndex: number, pageSize: number) => Promise<void>;
  recordDocuments: Listed<DocumentModel> | null;
  fetchRecordDocuments: (recordId: string) => Promise<void>;
  activityDocuments: Listed<DocumentModel> | null;
  fetchActivityDocuments: (recordId: string) => Promise<void>;
  document: ActivityModel | null;
  fetchDocument: (id: string) => Promise<void>;
  updateFormData: ActivityUpdateModel;
  setUpdateField: (field: keyof ActivityUpdateModel, value: string) => void;
  setUpdateFormData: (data: ActivityUpdateModel) => void;

  isLoading: boolean;
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;

  setIsDynamic: (value: boolean) => void;
  setDynamicQuery: (query: DynamicQuery | null) => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: null,
  recordDocuments: null,
  activityDocuments: null,
  document: null,
  isLoading: false,
  isDynamic: false,
  dynamicQuery: null,

  fetchDocuments: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { isDynamic, dynamicQuery } = get();

      const data =
        isDynamic && dynamicQuery
          ? await GetListByDynamicActivity(pageIndex, pageSize, dynamicQuery)
          : await GetListActivity(pageIndex, pageSize);

      set({ documents: data });
    } catch (error) {
      // Handle error
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRecordDocuments: async (id: string) => {
    set({ isLoading: true });
    try {
      const data = await GetListByRecordIdDocument(id);

      set({ recordDocuments: data });
    } catch (error) {
      // Handle error
    } finally {
      set({ isLoading: false });
    }
  },

  fetchActivityDocuments: async id => {
    set({ isLoading: true });
    try {
      const data = await GetListByActivityIdDocument(id);

      set({ activityDocuments: data });
    } catch (error) {
      // Handle error
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDocument: async id => {
    set({ isLoading: true });
    try {
      const data = await GetByIdActivity(id);

      set({ document: data });
    } catch (error) {
      // Handle error
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
