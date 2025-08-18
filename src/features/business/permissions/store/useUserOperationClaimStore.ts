import { create } from "zustand";

import { Listed } from "@/core/network/api-results/Listed";
import {
  getAllUserOperationClaims,
  getAllUserRoles,
  getUser,
} from "../service/userOperationClaimService";
import { UserOperationClaimModel, UserOperationClaimsModel } from "../model/userOperationClaim";
import { IdentityUserModel } from "@/features/account/model/user";

interface UserOperationClaimState {
  Users: Listed<UserOperationClaimsModel> | null;
  fetchUsers: () => Promise<void>;
  User: IdentityUserModel | null;
  fetchUser: (userId: string) => Promise<void>;
  UserRoles: Listed<UserOperationClaimModel> | null;
  fetchUserRoles: (userId: string) => Promise<void>;
  isLoading: boolean;
}

export const useUserOperationClaimStore = create<UserOperationClaimState>((set, get) => ({
  Users: null,
  User: null,
  UserRoles: null,
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const data = await getAllUserOperationClaims();
      set({ Users: data?.data });
    } catch (error) {
      console.error("fetchUserOperationClaim error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUser: async (userId: string) => {
    set({ isLoading: true });
    try {
      const data = await getUser(userId);
      set({ User: data?.data });
    } catch (error) {
      console.error("fetchUserRoles error", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserRoles: async (userId: string) => {
    set({ isLoading: true });
    try {
      const data = await getAllUserRoles(userId);
      set({ UserRoles: data?.data });
    } catch (error) {
      console.error("fetchUserRoles error", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
