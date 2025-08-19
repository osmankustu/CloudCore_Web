import { create } from "zustand";

import { Listed } from "@/core/network/api-results/Listed";
import { OperationClaimModel, UserOperationClaim } from "../model/operationClaim";
import { getAllOperationClaims } from "../service/operationClaimService";

interface OperationClaimState {
  OperationClaimOptions: Listed<OperationClaimModel> | null;
  fetchOperationClaimOptions: () => Promise<void>;
  isLoading: boolean;
}

export const useOperationClaimStore = create<OperationClaimState>((set, get) => ({
  OperationClaimOptions: null,
  isLoading: false,

  fetchOperationClaimOptions: async () => {
    set({ isLoading: true });
    try {
      const data = await getAllOperationClaims();
      set({ OperationClaimOptions: data?.data });
    } catch (error) {
      console.error("fetchOperationClaimOptions error", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
