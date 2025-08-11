import { act } from "react";

import { DynamicQuery } from "@/core/models/requests/DynamicQuery";
import * as corporateCustomerService from "@/features/customer/corporate/service/corporateCustomerService";

import { CorporateCustomerUpdateModel } from "../model/corporateCustomer";
import { useCorporateCustomerStore } from "../store/useCorporateCustomerStore";

// before test reset
beforeEach(() => {
  useCorporateCustomerStore.setState({
    corporateCustomers: null,
    corporateCustomer: null,
    corporateOptions: null,
    dynamicQuery: null,
    isLoading: false,
    isDynamic: false,
    updateFormData: {
      id: "",
      createAt: "",
      customerNo: "",
      email: "",
      authorizedEmail: "",
      authorizedPersonName: "",
      authorizedPhoneNumber: "",
      companyName: "",
      sector: "",
      taxNumber: "",
      phoneNumber: "",
    },
  });
});
jest.clearAllMocks();

describe("useCorporateCustomerStore tests", () => {
  // Başlangıç değeri boş olmalıdır
  it("initial state must be null !", () => {
    const state = useCorporateCustomerStore.getState();
    expect(state.corporateCustomers).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.updateFormData.companyName).toBe("");
  });

  // alan güncelleme çalıştığında state güncellenmelidir
  it("the value should change when the state is updated", () => {
    act(() => {
      useCorporateCustomerStore.getState().setUpdateField("companyName", "ABC Ltd.");
    });

    expect(useCorporateCustomerStore.getState().updateFormData.companyName).toBe("ABC Ltd.");
  });

  // Normal sorgu isteği
  it("When fetchCorporateCustomers is called, state should be set (not DynamicQuery)", async () => {
    const fakeCustomers = { items: [{ id: "1", companyName: "Company 1" }], totalCount: 1 };

    jest
      .spyOn(corporateCustomerService, "GetListCorporateCustomer")
      .mockResolvedValue(fakeCustomers);

    useCorporateCustomerStore.setState({ isDynamic: false, dynamicQuery: null });

    await act(async () => {
      await useCorporateCustomerStore.getState().fetchCorporateCustomers(0, 10);
    });

    const state = useCorporateCustomerStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.corporateCustomers).toEqual(fakeCustomers);
    expect(corporateCustomerService.GetListCorporateCustomer).toHaveBeenCalledWith(0, 10);
  });

  // Dinamik sorgu isteği
  it("When fetchCorporateCustomers is called, state should be set (Dynamic Query)", async () => {
    const fakeCustomersDynamic = {
      items: [{ id: "2", companyName: "Dynamic Co." }],
      totalCount: 1,
    };
    const fakeQuery: DynamicQuery = { filter: {}, sort: [] };

    jest
      .spyOn(corporateCustomerService, "GetListByDynamicCorporateCustomer")
      .mockResolvedValue(fakeCustomersDynamic);

    useCorporateCustomerStore.setState({ isDynamic: true, dynamicQuery: fakeQuery });

    await act(async () => {
      await useCorporateCustomerStore.getState().fetchCorporateCustomers(1, 5);
    });

    const state = useCorporateCustomerStore.getState();

    expect(state.corporateCustomers).toEqual(fakeCustomersDynamic);
    expect(corporateCustomerService.GetListByDynamicCorporateCustomer).toHaveBeenCalledWith(
      1,
      5,
      fakeQuery,
    );
  });

  // Müşteri detayı geldiğinde
  it("When fetchCorporateCustomer is called, state should be set", async () => {
    const fakeCustomer = { id: "1", companyName: "Test Corp." };

    jest
      .spyOn(corporateCustomerService, "GetByIdCorporateCustomer")
      .mockResolvedValue(fakeCustomer);

    await act(async () => {
      await useCorporateCustomerStore.getState().fetchCorporateCustomer("1");
    });

    const state = useCorporateCustomerStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.corporateCustomer).toEqual(fakeCustomer);
    expect(corporateCustomerService.GetByIdCorporateCustomer).toHaveBeenCalledWith("1");
  });

  // Seçici veriler geldiğinde
  it("The state is set when fetchCorporateOptions is called", async () => {
    const fakeOptions = { items: [{ id: "1", companyName: "Option Corp." }] };

    jest.spyOn(corporateCustomerService, "GetAllCorporateCustomers").mockResolvedValue(fakeOptions);

    await act(async () => {
      await useCorporateCustomerStore.getState().fetchCorporateOptions();
    });

    const state = useCorporateCustomerStore.getState();

    expect(state.isLoading).toBe(false);
    expect(state.corporateOptions).toEqual(fakeOptions);
    expect(corporateCustomerService.GetAllCorporateCustomers).toHaveBeenCalled();
  });

  // Form verileri güncellenmeli
  it("The state should be updated when setUpdateFormData() runs", async () => {
    const fakeFormData: CorporateCustomerUpdateModel = {
      id: "1",
      createAt: "2025-01-01",
      customerNo: "C123",
      email: "test@corp.com",
      authorizedEmail: "auth@corp.com",
      authorizedPersonName: "Jane Doe",
      authorizedPhoneNumber: "123456789",
      companyName: "Form Corp.",
      sector: "Tech",
      taxNumber: "TX123",
      phoneNumber: "987654321",
    };

    await act(async () => {
      useCorporateCustomerStore.getState().setUpdateFormData(fakeFormData);
    });

    const state = useCorporateCustomerStore.getState();

    expect(state.updateFormData).toEqual(fakeFormData);
  });

  // isDynamic değişince
  it("When isDynamic changes, the state should be updated", async () => {
    await act(async () => {
      useCorporateCustomerStore.getState().setIsDynamic(true);
    });

    expect(useCorporateCustomerStore.getState().isDynamic).toBe(true);
  });

  // dynamicQuery değişince
  it("When dynamicQuery changes, the state should be updated", async () => {
    const fakeDynamicQuery: DynamicQuery = {
      sort: [],
      filter: {
        caseSensitive: false,
        field: "companyName",
        logic: "and",
        operator: "contains",
        value: "A",
      },
    };

    await act(async () => {
      useCorporateCustomerStore.getState().setDynamicQuery(fakeDynamicQuery);
    });

    expect(useCorporateCustomerStore.getState().dynamicQuery).toEqual(fakeDynamicQuery);
  });
});
