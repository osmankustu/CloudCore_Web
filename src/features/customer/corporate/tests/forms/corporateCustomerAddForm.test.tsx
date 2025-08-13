/* eslint-disable unused-imports/no-unused-vars */
// corporateCustomerAddForm.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import CorporateCustomerAddForm from "../../components/forms/CorporateCustomerAddForm";

jest.mock("../../service/corporateCustomerService", () => ({
  AddCorporateCustomer: jest.fn(),
}));

jest.mock("@/core/hooks/useRequestAction", () => ({
  useRequestAction: () => ({
    run: (fn: () => Promise<void> | void) => fn(),
    isLoading: false,
  }),
}));

jest.mock("@/core/context/FormErrorContext", () => ({
  useFormErrors: () => ({
    errors: {},
    clearErrors: jest.fn(),
  }),
}));

jest.mock("@/core/utils/toastHelper", () => ({
  showSuccess: jest.fn(),
}));

import { showSuccess } from "@/core/utils/toastHelper";

import { AddCorporateCustomer } from "../../service/corporateCustomerService";

describe("CorporateCustomerAddForm", () => {
  const onCloseMock = jest.fn();
  const clearErrorsMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Form başlıkları ve inputlar render olur", () => {
    render(<CorporateCustomerAddForm isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText("Firma Oluştur")).toBeInTheDocument();
    expect(screen.getByText("Genel Bilgiler")).toBeInTheDocument();
    expect(screen.getByText("İletişim Bilgileri")).toBeInTheDocument();

    expect(screen.getByLabelText("Firma Adı")).toBeInTheDocument();
    expect(screen.getByLabelText("Vergi Numarası")).toBeInTheDocument();

    // Telefon inputları birden fazla olabilir, hepsinin render olduğunu kontrol edelim
    const phoneInputs = screen.getAllByLabelText("Telefon");
    expect(phoneInputs.length).toBeGreaterThan(0);

    expect(screen.getByLabelText("E-Posta")).toBeInTheDocument();
    expect(screen.getByLabelText("Adı Soyadı")).toBeInTheDocument();
  });

  test("Inputlara yazılabilir", async () => {
    render(<CorporateCustomerAddForm isOpen={true} onClose={onCloseMock} />);
    const user = userEvent.setup();

    const companyNameInput = screen.getByLabelText("Firma Adı") as HTMLInputElement;
    await user.clear(companyNameInput);
    await user.type(companyNameInput, "Test Şirketi");
    expect(companyNameInput.value).toBe("Test Şirketi");

    const taxNumberInput = screen.getByLabelText("Vergi Numarası") as HTMLInputElement;
    await user.clear(taxNumberInput);
    await user.type(taxNumberInput, "123456789");
    expect(taxNumberInput.value).toBe("123456789");

    const phoneInputs = screen.getAllByLabelText("Telefon") as HTMLInputElement[];
    await user.clear(phoneInputs[0]);
    await user.type(phoneInputs[0], "5551112233");
    expect(phoneInputs[0].value).toBe("5551112233");

    const emailInput = screen.getByLabelText("E-Posta") as HTMLInputElement;
    await user.clear(emailInput);
    await user.type(emailInput, "test@example.com");
    expect(emailInput.value).toBe("test@example.com");

    const nameInput = screen.getByLabelText("Adı Soyadı") as HTMLInputElement;
    await user.clear(nameInput);
    await user.type(nameInput, "Ali Veli");
    expect(nameInput.value).toBe("Ali Veli");
  });

  test("Oluştur butonuna tıklanınca AddCorporateCustomer çağrılır ve işlemler yapılır", async () => {
    (AddCorporateCustomer as jest.Mock).mockResolvedValue({ status: 201 });

    render(<CorporateCustomerAddForm isOpen={true} onClose={onCloseMock} />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText("Firma Adı"), "Test Şirketi");
    await user.type(screen.getByLabelText("Vergi Numarası"), "123456789");

    const phoneInputs = screen.getAllByLabelText("Telefon");
    await user.type(phoneInputs[0], "5551112233");

    await user.type(screen.getByLabelText("E-Posta"), "test@example.com");
    await user.type(screen.getByLabelText("Adı Soyadı"), "Ali Veli");

    const createButton = screen.getByRole("button", { name: /Oluştur/i });
    await user.click(createButton);

    await waitFor(() => {
      expect(AddCorporateCustomer).toHaveBeenCalledWith({
        companyName: "Test Şirketi",
        taxNumber: "123456789",
        phoneNumber: "5551112233",
        authorizedPersonName: "Ali Veli",
        authorizedEmail: "",
        authorizedPhoneNumber: "",
        sector: "",
        email: "test@example.com",
      });

      expect(onCloseMock).toHaveBeenCalled();
      expect(showSuccess).toHaveBeenCalledWith("Müşteri Eklendi");
      //   expect(clearErrorsMock).toHaveBeenCalled();
    });
  });

  test("Kapat butonuna tıklanınca onClose çağrılır", async () => {
    render(<CorporateCustomerAddForm isOpen={true} onClose={onCloseMock} />);
    const closeButton = screen.getByRole("button", { name: /Kapat/i });
    await userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
