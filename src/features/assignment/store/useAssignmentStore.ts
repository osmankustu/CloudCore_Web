import { create } from "zustand";

import { AssignmentModel } from "../model/Assignment";
import { GetByServiceRecordIdAssignment } from "../service/AssignmentService";

interface AssignmentState {
  assignment: AssignmentModel | null;
  fetchAssignment: (serviceId: string) => Promise<void>;

  isLoading: boolean;
}

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  assignment: null,
  isLoading: false,

  fetchAssignment: async serviceId => {
    set({ isLoading: true });
    try {
      const data = await GetByServiceRecordIdAssignment(serviceId);

      set({ assignment: data });
    } catch (error) {
      console.error("fetchCustomers error", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
