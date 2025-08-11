import { act } from "react";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import * as individualCustomerService from "@/features/customer/individual/service/individualCustomerService";

import { IndividualCustomerUpdateModel } from "../model/IndividualCustomer";
import { useIndividualCustomerStore } from "../store/useIndividualCustomerStore";

// Before each test, reset state
beforeEach(() => {
  useIndividualCustomerStore.setState({
    individualCustomers: null,
    individualCustomer: null,
    individualOptions: null,
    dynamicQuery: null,
    isLoading: false,
    isDynamic: false,
    updateFormData: {
      id: "",
      createAt: "",
      customerNo: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });
  jest.clearAllMocks();
});

describe("useIndividualCustomerStore tests", () => {
  it("initial state must be correct", () => {
    const state = useIndividualCustomerStore.getState();
    expect(state.individualCustomers).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.updateFormData.firstName).toBe("");
  });

  it("setUpdateField should update the form field", () => {
    act(() => {
      useIndividualCustomerStore.getState().setUpdateField("firstName", "John");
    });

    expect(useIndividualCustomerStore.getState().updateFormData.firstName).toBe("John");
  });

  it("fetchIndividualCustomers should call GetListIndividualCustomer when not dynamic", async () => {
    const fakeCustomers = { items: [{ id: "1", firstName: "Alice" }], totalCount: 1 };

    jest
      .spyOn(individualCustomerService, "GetListIndividualCustomer")
      .mockResolvedValue(fakeCustomers);

    useIndividualCustomerStore.setState({ isDynamic: false, dynamicQuery: null });

    await act(async () => {
      await useIndividualCustomerStore.getState().fetchIndividualCustomers(0, 10);
    });

    const state = useIndividualCustomerStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.individualCustomers).toEqual(fakeCustomers);
    expect(individualCustomerService.GetListIndividualCustomer).toHaveBeenCalledWith(0, 10);
  });

  it("fetchIndividualCustomers should call GetListByDynamicIndividualCustomer when dynamic", async () => {
    const fakeCustomersDynamic = { items: [{ id: "2", firstName: "Dynamic" }], totalCount: 1 };
    const fakeQuery: DynamicQuery = { filter: {}, sort: [] };

    jest
      .spyOn(individualCustomerService, "GetListByDynamicIndividualCustomer")
      .mockResolvedValue(fakeCustomersDynamic);

    useIndividualCustomerStore.setState({ isDynamic: true, dynamicQuery: fakeQuery });

    await act(async () => {
      await useIndividualCustomerStore.getState().fetchIndividualCustomers(1, 5);
    });

    const state = useIndividualCustomerStore.getState();
    expect(state.individualCustomers).toEqual(fakeCustomersDynamic);
    expect(individualCustomerService.GetListByDynamicIndividualCustomer).toHaveBeenCalledWith(
      1,
      5,
      fakeQuery,
    );
  });

  it("fetchIndividualCustomer should set state correctly", async () => {
    const fakeCustomer = { id: "1", firstName: "John" };

    jest
      .spyOn(individualCustomerService, "GetByIdIndividualCustomer")
      .mockResolvedValue(fakeCustomer);

    await act(async () => {
      await useIndividualCustomerStore.getState().fetchIndividualCustomer("1");
    });

    const state = useIndividualCustomerStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.individualCustomer).toEqual(fakeCustomer);
    expect(individualCustomerService.GetByIdIndividualCustomer).toHaveBeenCalledWith("1");
  });

  it("fetchIndividualOptions should set options", async () => {
    const fakeOptions = { items: [{ id: "1", firstName: "Option" }] };

    jest
      .spyOn(individualCustomerService, "GetAllIndividualCustomers")
      .mockResolvedValue(fakeOptions);

    await act(async () => {
      await useIndividualCustomerStore.getState().fetchIndividualOptions();
    });

    const state = useIndividualCustomerStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.individualOptions).toEqual(fakeOptions);
    expect(individualCustomerService.GetAllIndividualCustomers).toHaveBeenCalled();
  });

  it("setUpdateFormData should replace the whole form data", async () => {
    const fakeFormData: IndividualCustomerUpdateModel = {
      id: "1",
      createAt: "2025-01-01",
      customerNo: "IC123",
      email: "test@indiv.com",
      firstName: "Jane",
      lastName: "Doe",
      phoneNumber: "123456789",
    };

    await act(async () => {
      useIndividualCustomerStore.getState().setUpdateFormData(fakeFormData);
    });

    const state = useIndividualCustomerStore.getState();
    expect(state.updateFormData).toEqual(fakeFormData);
  });

  it("setIsDynamic should update isDynamic", async () => {
    await act(async () => {
      useIndividualCustomerStore.getState().setIsDynamic(true);
    });

    expect(useIndividualCustomerStore.getState().isDynamic).toBe(true);
  });

  it("setDynamicQuery should update dynamicQuery", async () => {
    const fakeDynamicQuery: DynamicQuery = {
      sort: [],
      filter: {
        caseSensitive: false,
        field: "firstName",
        logic: "and",
        operator: "contains",
        value: "A",
      },
    };

    await act(async () => {
      useIndividualCustomerStore.getState().setDynamicQuery(fakeDynamicQuery);
    });

    expect(useIndividualCustomerStore.getState().dynamicQuery).toEqual(fakeDynamicQuery);
  });
});
