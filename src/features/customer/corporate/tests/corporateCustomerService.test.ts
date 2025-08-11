import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";
import {
  CorporateCustomerAddModel,
  CorporateCustomerUpdateModel,
} from "@/features/customer/corporate/model/corporateCustomer";
import * as corporateCustomerService from "@/features/customer/corporate/service/corporateCustomerService";

jest.mock("@/core/network/axiosInstance");

describe("corporateCustomerService tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Ekleme
  it("AddCorporateCustomer should call axiosInstance.post and return response", async () => {
    const fakeResponse = { data: { id: "1", companyName: "ABC Ltd" } };
    (axiosInstance.post as jest.Mock).mockResolvedValue(fakeResponse);

    const model: CorporateCustomerAddModel = {
      companyName: "ABC Ltd",
    } as CorporateCustomerAddModel;

    const res = await corporateCustomerService.AddCorporateCustomer(model);

    expect(axiosInstance.post).toHaveBeenCalledWith("customers/corporate", model);
    expect(res).toBe(fakeResponse);
  });

  // Güncelleme
  it("UpdateCorporateCustomer should call axiosInstance.put and return response", async () => {
    const fakeResponse = { data: { id: "1", companyName: "Updated ABC Ltd" } };
    (axiosInstance.put as jest.Mock).mockResolvedValue(fakeResponse);

    const model: CorporateCustomerUpdateModel = {
      id: "1",
      companyName: "Updated ABC Ltd",
    } as CorporateCustomerUpdateModel;

    const res = await corporateCustomerService.UpdateCorporateCustomer(model);

    expect(axiosInstance.put).toHaveBeenCalledWith("customers/corporate", model);
    expect(res).toBe(fakeResponse);
  });

  // Silme
  it("DeleteCorporateCustomer should call axiosInstance.delete and return data", async () => {
    const fakeData = { id: "123", companyName: "XYZ Ltd" };
    (axiosInstance.delete as jest.Mock).mockResolvedValue({ data: fakeData });

    const id = "123";
    const res = await corporateCustomerService.DeleteCorporateCustomer(id);

    expect(axiosInstance.delete).toHaveBeenCalledWith("customers/corporate/" + id);
    expect(res).toEqual(fakeData);
  });

  // Listeleme
  it("GetListCorporateCustomer should call axiosInstance.get and return data", async () => {
    const fakeData = { items: [], total: 0 };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const pageIndex = 0;
    const pageSize = 20;
    const res = await corporateCustomerService.GetListCorporateCustomer(pageIndex, pageSize);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `customers/corporate?PageIndex=${pageIndex}&PageSize=${pageSize}`,
    );
    expect(res).toEqual(fakeData);
  });

  // Dinamik sorgu
  it("GetListByDynamicCorporateCustomer should call axiosInstance.post and return data", async () => {
    const fakeData = { items: [], total: 0 };
    const fakeDynamicQuery: DynamicQuery = {
      filter: {
        field: "companyName",
        operator: "contains",
        value: "ABC",
        logic: "and",
        caseSensitive: false,
      },
      sort: [],
    };
    (axiosInstance.post as jest.Mock).mockResolvedValue({ data: fakeData });

    const pageIndex = 0;
    const pageSize = 20;
    const res = await corporateCustomerService.GetListByDynamicCorporateCustomer(
      pageIndex,
      pageSize,
      fakeDynamicQuery,
    );

    expect(axiosInstance.post).toHaveBeenCalledWith(
      `customers/corporate/get-list/by-dynamic?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      fakeDynamicQuery,
    );
    expect(res).toEqual(fakeData);
  });

  // Seçici listesi
  it("GetAllCorporateCustomers should call axiosInstance.get and return data", async () => {
    const fakeData = { items: [{ id: "1", companyName: "ABC Ltd" }] };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const res = await corporateCustomerService.GetAllCorporateCustomers();

    expect(axiosInstance.get).toHaveBeenCalledWith("customers/corporate/get-list/for-select");
    expect(res).toEqual(fakeData);
  });

  // Id'ye göre getir
  it("GetByIdCorporateCustomer should call axiosInstance.get and return data", async () => {
    const fakeData = { id: "1", companyName: "ABC Ltd" };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const id = "1";
    const res = await corporateCustomerService.GetByIdCorporateCustomer(id);

    expect(axiosInstance.get).toHaveBeenCalledWith("customers/corporate/" + id);
    expect(res).toEqual(fakeData);
  });
});
