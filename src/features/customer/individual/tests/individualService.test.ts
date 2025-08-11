import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import axiosInstance from "@/core/network/axiosInstance";
import {
  IndividualCustomerAddModel,
  IndividualCustomerUpdateModel,
} from "@/features/customer/individual/model/IndividualCustomer";
import * as individualCustomerService from "@/features/customer/individual/service/individualCustomerService";

jest.mock("@/core/network/axiosInstance");

describe("individualCustomerService tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Ekleme
  it("AddIndividualCustomer should call axiosInstance.post and return response", async () => {
    const fakeResponse = { data: { id: "1", firstName: "John" } };
    (axiosInstance.post as jest.Mock).mockResolvedValue(fakeResponse);

    const model: IndividualCustomerAddModel = {
      firstName: "John",
    } as IndividualCustomerAddModel;

    const res = await individualCustomerService.AddIndividualCustomer(model);

    expect(axiosInstance.post).toHaveBeenCalledWith("customers/individual", model);
    expect(res).toBe(fakeResponse);
  });

  // Güncelleme
  it("UpdateIndividualCustomer should call axiosInstance.put and return response", async () => {
    const fakeResponse = { data: { id: "1", firstName: "Jane" } };
    (axiosInstance.put as jest.Mock).mockResolvedValue(fakeResponse);

    const model: IndividualCustomerUpdateModel = {
      id: "1",
      firstName: "Jane",
    } as IndividualCustomerUpdateModel;

    const res = await individualCustomerService.UpdateIndividualCustomer(model);

    expect(axiosInstance.put).toHaveBeenCalledWith("customers/individual", model);
    expect(res).toBe(fakeResponse);
  });

  // Silme
  it("DeleteIndividualCustomer should call axiosInstance.delete and return data", async () => {
    const fakeData = { id: "123", firstName: "Deleted" };
    (axiosInstance.delete as jest.Mock).mockResolvedValue({ data: fakeData });

    const id = "123";
    const res = await individualCustomerService.DeleteIndividualCustomer(id);

    expect(axiosInstance.delete).toHaveBeenCalledWith("customers/individual/" + id);
    expect(res).toEqual(fakeData);
  });

  // Listeleme
  it("GetListIndividualCustomer should call axiosInstance.get and return data", async () => {
    const fakeData = { items: [], total: 0 };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const pageIndex = 0;
    const pageSize = 20;
    const res = await individualCustomerService.GetListIndividualCustomer(pageIndex, pageSize);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `customers/individual?PageIndex=${pageIndex}&PageSize=${pageSize}`,
    );
    expect(res).toEqual(fakeData);
  });

  // Dinamik sorgu
  it("GetListByDynamicIndividualCustomer should call axiosInstance.post and return data", async () => {
    const fakeData = { items: [], total: 0 };
    const fakeDynamicQuery: DynamicQuery = {
      filter: {
        field: "firstName",
        operator: "contains",
        value: "John",
        logic: "and",
        caseSensitive: false,
      },
      sort: [],
    };
    (axiosInstance.post as jest.Mock).mockResolvedValue({ data: fakeData });

    const pageIndex = 0;
    const pageSize = 20;
    const res = await individualCustomerService.GetListByDynamicIndividualCustomer(
      pageIndex,
      pageSize,
      fakeDynamicQuery,
    );

    expect(axiosInstance.post).toHaveBeenCalledWith(
      `customers/individual/get-list/by-dynamic?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      fakeDynamicQuery,
    );
    expect(res).toEqual(fakeData);
  });

  // Seçici listesi
  it("GetAllIndividualCustomers should call axiosInstance.get and return data", async () => {
    const fakeData = { items: [{ id: "1", firstName: "John" }] };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const res = await individualCustomerService.GetAllIndividualCustomers();

    expect(axiosInstance.get).toHaveBeenCalledWith("customers/individual/get-list/for-select");
    expect(res).toEqual(fakeData);
  });

  // Id'ye göre getir
  it("GetByIdIndividualCustomer should call axiosInstance.get and return data", async () => {
    const fakeData = { id: "1", firstName: "John" };
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const id = "1";
    const res = await individualCustomerService.GetByIdIndividualCustomer(id);

    expect(axiosInstance.get).toHaveBeenCalledWith("customers/individual/" + id);
    expect(res).toEqual(fakeData);
  });

  // Adres listesi
  it("getAddress should call axiosInstance.get and return data", async () => {
    const fakeData = [{ id: "1", city: "Istanbul" }];
    (axiosInstance.get as jest.Mock).mockResolvedValue({ data: fakeData });

    const res = await individualCustomerService.getAddress();

    expect(axiosInstance.get).toHaveBeenCalledWith("/address/");
    expect(res).toEqual(fakeData);
  });
});
