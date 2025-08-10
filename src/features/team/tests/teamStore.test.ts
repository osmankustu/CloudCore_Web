import * as teamService from "@/features/team/service/teamService";
import { useTeamStore } from "../store/useTeamStore";
import { act } from "react";
import { DynamicQuery } from "@/core/models/requests/DynamicQuery";

// before test reset
beforeEach(() => {
  useTeamStore.setState({
    teams: null,
    teamOptions: null,
    team: null,
    dynamicQuery: null,
    isLoading: false,
    isDynamic: false,
    updateFormData: {
      createAt: "",
      id: "",
      isActive: true,
      name: "",
      personelIds: [],
      teamCode: "",
    },
  });
});
jest.clearAllMocks();

describe("", () => {
  it("initial state must be null !", () => {
    const state = useTeamStore.getState();
    expect(state.teams).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.updateFormData.name).toBe("");
  });
});

it("he value should change when the state is updated", () => {
  act(() => {
    useTeamStore.getState().setUpdateField("name", "Jhon Doe");
  });

  expect(useTeamStore.getState().updateFormData.name).toBe("Jhon Doe");
});

it("When Fetch teams is called, the state is set (not DynamicQuery)", async () => {
  const fakeTeams = { items: [{ id: "1", name: "Team 1" }], totalCount: 1 };

  jest.spyOn(teamService, "GetListTeam").mockResolvedValue(fakeTeams);

  // reset isDynamic and dynamicQuery
  useTeamStore.setState({ isDynamic: false, dynamicQuery: null });

  await act(async () => {
    await useTeamStore.getState().fetchTeams(0, 10);
  });

  const state = useTeamStore.getState();

  expect(state.isLoading).toBe(false);
  expect(state.teams).toEqual(fakeTeams);
  expect(teamService.GetListTeam).toHaveBeenCalledWith(0, 10);
});

it("When Fetch teams is called the state is set (Dynamic Query is true)", async () => {
  const fakeTeamsDynamic = { items: [{ id: "2", name: "Dynamic Team" }], totalCount: 1 };
  const fakeQuery: DynamicQuery = { filter: {}, sort: [] };

  jest.spyOn(teamService, "GetListByDynamicTeam").mockResolvedValue(fakeTeamsDynamic);

  useTeamStore.setState({ isDynamic: true, dynamicQuery: fakeQuery });

  await act(async () => {
    await useTeamStore.getState().fetchTeams(1, 5);
  });

  const state = useTeamStore.getState();

  expect(state.teams).toEqual(fakeTeamsDynamic);
  expect(teamService.GetListByDynamicTeam).toHaveBeenCalledWith(1, 5, fakeQuery);
});
