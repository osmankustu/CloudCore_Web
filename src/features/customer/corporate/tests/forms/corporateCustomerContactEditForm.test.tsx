import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import CorporateCustomerContactEditForm from "../../components/forms/CorporateCustomerContactEditForm";

jest.mock("../../service/corporateCustomerService", () => ({
  UpdateCorporateCustomer: jest.fn(),
}));

jest.mock("@/core/hooks/useRequestAction", () => ({
  useRequestAction: () => ({
    run: (fn: () => Promise<void> | void) => fn(),
    isLoading: false,
  }),
}));

const fetchCorporateCustomerMock = jest.fn();
const setUpdateFormDataMock = jest.fn();
const setUpdateFieldMock = jest.fn();

jest.mock("../../store/useCorporateCustomerStore", () => ({
  useCorporateCustomerStore: () => ({
    corporateCustomer: {
      id: "customer-1",
      companyName: "Test Firma",
      customerNo: "C001",
      email: "test@firma.com",
      phoneNumber: "5551234567",
      taxNumber: "123456789",
      sector: "Teknoloji",
      authorizedPersonName: "Ali Veli",
      authorizedEmail: "ali@firma.com",
      authorizedPhoneNumber: "5559876543",
      createAt: "2023-01-01",
    },
    updateFormData: {
      id: "customer-1",
      companyName: "Test Firma",
      customerNo: "C001",
      email: "test@firma.com",
      phoneNumber: "5551234567",
      taxNumber: "123456789",
      sector: "Teknoloji",
      authorizedPersonName: "Ali Veli",
      authorizedEmail: "ali@firma.com",
      authorizedPhoneNumber: "5559876543",
      createAt: "2023-01-01",
    },
    fetchCorporateCustomer: fetchCorporateCustomerMock,
    setUpdateFormData: setUpdateFormDataMock,
    setUpdateField: setUpdateFieldMock,
  }),
}));

const clearErrorsMock = jest.fn();

jest.mock("@/core/context/FormErrorContext", () => ({
  useFormErrors: () => ({
    errors: {},
    clearErrors: clearErrorsMock,
  }),
}));

jest.mock("@/core/utils/toastHelper", () => ({
  showSuccess: jest.fn(),
}));

import { showSuccess } from "@/core/utils/toastHelper";

import { UpdateCorporateCustomer } from "../../service/corporateCustomerService";

describe("CorporateCustomerContactEditForm", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test("Form başlıkları ve inputlar render olur", () => {
  //   render(<CorporateCustomerContactEditForm isOpen={true} onClose={onCloseMock} />);

  //   expect(screen.getByText("İletişim Bilgileri Güncelle")).toBeInTheDocument();
  //   expect(
  //     screen.getByText("Firma bilgilerini güncel tutmak için yeni bilgileri girin"),
  //   ).toBeInTheDocument();

  //   expect(screen.getByRole("textbox", { name: /Telefon/i })).toHaveValue("5551234567");
  //   expect(screen.getByRole("textbox", { name: /E-Posta/i })).toHaveValue("test@firma.com");
  //   expect(screen.getByRole("textbox", { name: /Adı Soyadı/i })).toHaveValue("Ali Veli");
  //   expect(screen.getByRole("textbox", { name: /Yetkili Kişi İletişim Bilgileri/i })); // Label yok, check individual inputs instead

  //   // Örnek olarak authorizedPhoneNumber ve authorizedEmail inputları da kontrol edebilirsin:
  //   expect(screen.getByRole("textbox", { name: /Yetkili Telefon/i })).toHaveValue("5559876543");
  //   expect(screen.getByRole("textbox", { name: /Yetkili E-Posta/i })).toHaveValue("ali@firma.com");

  //   expect(screen.getByText("Kapat")).toBeInTheDocument();
  //   expect(screen.getByText("Kaydet")).toBeInTheDocument();
  // });

  // test("Inputlara yazılınca setUpdateField çağrılır", async () => {
  //   render(<CorporateCustomerContactEditForm isOpen={true} onClose={onCloseMock} />);

  //   const authorizedPersonInput = screen.getByRole("textbox", { name: /Adı Soyadı/i });
  //   await userEvent.clear(authorizedPersonInput);
  //   await userEvent.type(authorizedPersonInput, "Ahmet Yılmaz");

  //   const calls = setUpdateFieldMock.mock.calls;
  //   const lastCall = calls[calls.length - 1];
  //   expect(lastCall).toEqual(["authorizedPersonName", "Ahmet Yılmaz"]);
  // });

  test("Kaydet butonuna tıklanınca UpdateCorporateCustomer çağrılır ve işlemler yapılır", async () => {
    (UpdateCorporateCustomer as jest.Mock).mockResolvedValue({ status: 200 });

    render(<CorporateCustomerContactEditForm isOpen={true} onClose={onCloseMock} />);

    const saveButton = screen.getByText("Kaydet");
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(UpdateCorporateCustomer).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "customer-1",
          companyName: "Test Firma",
        }),
      );
      expect(onCloseMock).toHaveBeenCalled();
      expect(showSuccess).toHaveBeenCalledWith("İletişim Bilgileri Güncellendi");
      expect(clearErrorsMock).toHaveBeenCalled();
      expect(fetchCorporateCustomerMock).toHaveBeenCalledWith("customer-1");
    });
  });
});
