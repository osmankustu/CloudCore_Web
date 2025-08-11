import { create } from "zustand";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import { Listed } from "@/core/network/api-results/Listed";
import { Paginated } from "@/core/network/api-results/Paginated";
import { TeamModel, TeamSelectModel, TeamUpdateModel } from "@/features/team/model/team";
import {
  GetAllTeam,
  GetByIdTeam,
  GetListByDynamicTeam,
  GetListTeam,
} from "@/features/team/service/teamService";

interface TeamState {
  teams: Paginated<TeamModel> | null;
  fetchTeams: (pageIndex: number, pageSize: number) => Promise<void>;
  team: TeamModel | null;
  fetchTeam: (id: string) => Promise<void>;
  teamOptions: Listed<TeamSelectModel> | null;
  fetchTeamOptions: () => Promise<void>;
  updateFormData: TeamUpdateModel;
  setUpdateField: (field: keyof TeamUpdateModel, value: string | string[] | boolean) => void;
  setUpdateFormData: (data: TeamUpdateModel) => void;

  isLoading: boolean;
  isDynamic: boolean;
  dynamicQuery: DynamicQuery | null;

  setIsDynamic: (value: boolean) => void;
  setDynamicQuery: (query: DynamicQuery | null) => void;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  teams: null,
  team: null,
  teamOptions: null,
  isLoading: false,
  isDynamic: false,
  dynamicQuery: null,

  fetchTeams: async (pageIndex, pageSize) => {
    set({ isLoading: true });
    try {
      const { isDynamic, dynamicQuery } = get();

      const data =
        isDynamic && dynamicQuery
          ? await GetListByDynamicTeam(pageIndex, pageSize, dynamicQuery)
          : await GetListTeam(pageIndex, pageSize);

      set({ teams: data });
    } catch (error) {
      // example usage Logger.w();
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTeam: async id => {
    set({ isLoading: true });
    try {
      const data = await GetByIdTeam(id);

      set({ team: data });
    } catch (error) {
      // example usage Logger.w();
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTeamOptions: async () => {
    set({ isLoading: true });
    try {
      const data = await GetAllTeam();
      set({ teamOptions: data });
    } catch (error) {
      // example usage Logger.w();
    } finally {
      set({ isLoading: false });
    }
  },

  updateFormData: {
    createAt: "",
    id: "",
    isActive: true,
    name: "",
    personelIds: [],
    teamCode: "",
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
