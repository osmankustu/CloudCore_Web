import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";
import * as teamService from "@/features/employee/team/service/teamService"; // servisin dosya yolu

import { TeamAddModel, TeamUpdateModel } from "../model/team";

jest.mock("@/core/network/axiosInstance");

describe("teamService tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Ekleme
  it("AddTeam should call axiosInstance.post and return response", async () => {
    const fakeResponse = { data: { id: "1", name: "Team 1" } };
    (axiosInstance.post as jest.Mock).mockResolvedValue(fakeResponse);

    const model: TeamAddModel = { name: "Team 1" } as TeamAddModel; // TeamAddModel örneği

    const res = await teamService.AddTeam(model);

    expect(axiosInstance.post).toHaveBeenCalledWith("/teams", model);
    expect(res).toBe(fakeResponse);
  });

  //Güncelleme
  it("UpdateTeam should call axiosInstance.put and return response", async () => {
    const fakeResponse = { data: { id: "1", name: "Team 1" } };
    (axiosInstance.put as jest.Mock).mockResolvedValue(fakeResponse);

    const model: TeamUpdateModel = { id: "1", name: "Updated Team 1" } as TeamUpdateModel; // TeamUpdateModel örneği

    const res = await teamService.UpdateTeam(model);

    expect(axiosInstance.put).toHaveBeenCalledWith("/teams", model);
    expect(res).toBe(fakeResponse);
  });

  //Silme
  it("DeleteTeam should call axiosInstance.delete and return data", async () => {
    const fakeData = { id: "123", name: "Team 123" };
    (axiosInstance.delete as jest.Mock).mockResolvedValue({ data: fakeData });

    const id = "123";
    const res = await teamService.DeleteTeam(id);

    expect(axiosInstance.delete).toHaveBeenCalledWith("/teams/" + id);
    expect(res).toEqual(fakeData);
  });

  // Listeleme
  it("GetListTeam should call axiosInstance.get and return data", async () => {
    const fakeData = { items: [], total: 0 };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const pageIndex = 0;
    const pageSize = 10;
    const res = await teamService.GetListTeam(pageIndex, pageSize);

    expect(axiosInstance.get).toHaveBeenCalledWith("/teams?PageIndex=0&PageSize=10");
    expect(res).toEqual(fakeData);
  });

  //Dinamik Sorgu ile Listeleme
  it("GetListByDynamicTeam should call axiosInstance.get and return data", async () => {
    const fakeData = { items: [], total: 0 };
    const fakeDynamicQuery: DynamicQuery = {
      filter: {
        field: "name",
        operator: "contains",
        value: "Team",
        logic: "and",
        caseSensitive: false,
      },
      sort: [],
    };
    (axiosInstance.post as jest.Mock).mockResolvedValue({ data: fakeData });

    const pageIndex = 0;
    const pageSize = 10;
    const res = await teamService.GetListByDynamicTeam(pageIndex, pageSize, fakeDynamicQuery);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/teams/get-list/by-dynamic?PageIndex=0&PageSize=10",
      fakeDynamicQuery,
    );
    expect(res).toEqual(fakeData);
  });

  // Seçici için listeleme
  it("GetAllTeam should call axiosInstance.get and return data", async () => {
    const fakeData = { items: [{ id: "1", name: "Team 1" }] };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const res = await teamService.GetAllTeam();

    expect(axiosInstance.get).toHaveBeenCalledWith("/teams/get-list/for-select");
    expect(res).toEqual(fakeData);
  });

  //Id ye göre Getir
  it("GetTeamById should call axiosInstance.get and return data", async () => {
    const fakeData = { id: "1", name: "Team 1" };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const id = "1";
    const res = await teamService.GetByIdTeam(id);

    expect(axiosInstance.get).toHaveBeenCalledWith("/teams/" + id);
    expect(res).toEqual(fakeData);
  });

  // Diğer fonksiyonlar için de benzer şekilde testler yazabilirsin
});
