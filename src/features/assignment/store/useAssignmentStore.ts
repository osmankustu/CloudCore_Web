import { create } from "zustand";

import { AssignmentModel } from "../model/Assignment";
import { GetByServiceRecordIdAssignment } from "../service/AssignmentService";

interface AssignmentState {
  assignment: AssignmentModel | null;
  fetchAssignment: (serviceId: string) => Promise<void>;

  isLoading: boolean;
}

export const useAssignmentStore = create<AssignmentState>(set => ({
  assignment: null,
  isLoading: false,

  fetchAssignment: async serviceId => {
    set({ isLoading: true });
    try {
      const data = await GetByServiceRecordIdAssignment(serviceId);

      set({ assignment: data });
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      // Logging
    } finally {
      set({ isLoading: false });
    }
  },
}));
