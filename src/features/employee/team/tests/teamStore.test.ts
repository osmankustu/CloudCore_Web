import { act } from "react";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import * as teamService from "@/features/employee/team/service/teamService";

import { TeamUpdateModel } from "../model/team";
import { useTeamStore } from "../store/useTeamStore";

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
  //Başlangıç değeri boş olmalıdır.
  it("initial state must be null !", () => {
    const state = useTeamStore.getState();
    expect(state.teams).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.updateFormData.name).toBe("");
  });
});

//alan güncelleme çalıştığında state güncellenmelidir.
it("he value should change when the state is updated", () => {
  act(() => {
    useTeamStore.getState().setUpdateField("name", "Jhon Doe");
  });

  expect(useTeamStore.getState().updateFormData.name).toBe("Jhon Doe");
});

//Normal sorgu isteği geldiğinde takımlar state değişmelidir.
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

//Dinamik sorgu isteği geldiğinde takımlar state değişmelidir.
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

//Takım detayı geldiğinde state değişmelidir.
it("When Fetch team is called the state is set", async () => {
  const fakeTeam = { id: "1", name: "Ekip 1" };

  jest.spyOn(teamService, "GetByIdTeam").mockResolvedValue(fakeTeam);

  await act(async () => {
    await useTeamStore.getState().fetchTeam("asdf");
  });

  const state = useTeamStore.getState();

  expect(state.isLoading).toBe(false);
  expect(state.team).toEqual(fakeTeam);
  expect(teamService.GetByIdTeam).toHaveBeenCalledWith("asdf");
});

//Seçici verileri geldiğinde state değişmelidir.
it("The state is set when the fetch get all team is called", async () => {
  const fakeOptions = { items: [{ id: "1", name: "Ekip 1" }] };

  jest.spyOn(teamService, "GetAllTeam").mockResolvedValue(fakeOptions);

  await act(async () => {
    await useTeamStore.getState().fetchTeamOptions();
  });

  const state = useTeamStore.getState();

  expect(state.isLoading).toBe(false);
  expect(state.teamOptions).toEqual(fakeOptions);
  expect(teamService.GetAllTeam).toHaveBeenCalledWith();
});

//"Form verilerini güncellemeyi ayarlama" çalıştığında durum güncellenmelidir.
it("The status should be updated when 'setUpdateFormData()' runs", async () => {
  const fakeFormData: TeamUpdateModel = {
    id: "1",
    name: "Team 1",
    personelIds: ["1", "2", "3"],
    createAt: Date.now.toString(),
    isActive: true,
    teamCode: "#1",
  };

  await act(async () => {
    useTeamStore.getState().setUpdateFormData(fakeFormData);
  });

  const state = useTeamStore.getState();

  expect(state.updateFormData).toEqual(fakeFormData);
});

//isDynamic değiştiğinde state güncellenmelidir.
it("When isDynamic changes, the state should be updated.", async () => {
  const fakeIsDynamic: boolean = true;

  await act(async () => {
    useTeamStore.getState().setIsDynamic(fakeIsDynamic);
  });

  const state = useTeamStore.getState();

  expect(state.isDynamic).toEqual(fakeIsDynamic);
});

//dinamik sorgu parametresi değiştiğinde state güncellenmelidr.
it("When the dynamic query parameter changes, the state must be updated.", async () => {
  const fakeDynamicQuery: DynamicQuery = {
    sort: [],
    filter: {
      caseSensitive: false,
      field: "field",
      logic: "and",
      operator: "contains",
      value: "a",
    },
  };

  await act(async () => {
    useTeamStore.getState().setDynamicQuery(fakeDynamicQuery);
  });

  const state = useTeamStore.getState();

  expect(state.dynamicQuery).toEqual(fakeDynamicQuery);
});
