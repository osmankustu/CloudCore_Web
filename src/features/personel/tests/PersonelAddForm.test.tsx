import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { InputProps } from "@/components/form/input/InputField";
import { LabelProps } from "@/components/form/Label";
import { ButtonProps } from "@/components/ui/button/Button";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { showError, showSuccess } from "@/core/utils/toast/toastHelper";
import { ProfilePhotoProps } from "@/features/personel/components/custom/ProfilePhotoPicker";
import PersonelAddForm from "@/features/personel/components/forms/PersonelAddForm";

import { PersonelDatePickerProps } from "../components/custom/PersonelDatePicker";
import { AddPersonel, UploadPersonelProfileImage } from "../service/personelService";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock hooks & utils
jest.mock("@/core/context/FormErrorContext", () => ({
  useFormErrors: jest.fn(),
}));

jest.mock("@/core/hooks/useRequestAction", () => ({
  useRequestAction: jest.fn(),
}));

jest.mock("@/features/personel/service/personelService", () => ({
  AddPersonel: jest.fn(),
  UploadPersonelProfileImage: jest.fn(),
}));

jest.mock("@/core/utils/toastHelper", () => ({
  showError: jest.fn(),
  showSuccess: jest.fn(),
}));

// Mock bileşenler (default export olarak)
// InputField
jest.mock("@/components/form/input/InputField", () => {
  const MockInputField = ({ error, ...props }: InputProps) => (
    <input data-testid={props.name} {...props} />
  );
  MockInputField.displayName = "MockInputField";
  return {
    __esModule: true,
    default: MockInputField,
  };
});

// Label
jest.mock("@/components/form/Label", () => {
  const MockLabel = (props: LabelProps) => <label>{props.children}</label>;
  MockLabel.displayName = "MockLabel";
  return {
    __esModule: true,
    default: MockLabel,
  };
});

// Button
jest.mock("@/components/ui/button/Button", () => {
  const MockButton = (props: ButtonProps) => <button {...props}>{props.children}</button>;
  MockButton.displayName = "MockButton";
  return {
    __esModule: true,
    default: MockButton,
  };
});

// ProfilePhotoPicker
jest.mock("@/features/personel/components/custom/ProfilePhotoPicker", () => {
  const MockProfilePhotoPicker = (props: ProfilePhotoProps) => (
    <div
      data-testid="profile-photo-picker"
      onClick={() => props.onChange(new File([], "test.jpg"))}
    >
      ProfilePicker
    </div>
  );
  MockProfilePhotoPicker.displayName = "MockProfilePhotoPicker";
  return {
    __esModule: true,
    default: MockProfilePhotoPicker,
  };
});

// PersonelDatePicker
jest.mock("@/features/personel/components/custom/PersonelDatePicker", () => ({
  __esModule: true,
  PersonelDatePicker: (props: PersonelDatePickerProps) => (
    <div data-testid={`date-picker-${props.text}`} onClick={() => props.onSelected("2025-01-01")}>
      DatePicker
    </div>
  ),
}));

describe("@/features/personel/components/forms/PersonelAddForm", () => {
  const mockPush = jest.fn();
  const mockRun = jest.fn(fn => fn());
  const mockClearErrors = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useFormErrors as jest.Mock).mockReturnValue({ errors: {}, clearErrors: mockClearErrors });
    (useRequestAction as jest.Mock).mockReturnValue({ run: mockRun });
  });

  it("form açıldığında initial verilerle doldurulmalı ve clearErrors çağrılmalı", () => {
    render(<PersonelAddForm isOpen={true} onClose={jest.fn()} />);
    expect(mockClearErrors).toHaveBeenCalled();
    expect(screen.getByTestId("firstName")).toHaveValue("");
  });

  it("input değiştiğinde formData güncellenmeli", () => {
    render(<PersonelAddForm isOpen={true} onClose={jest.fn()} />);
    const firstNameInput = screen.getByTestId("firstName");
    fireEvent.change(firstNameInput, { target: { value: "Ahmet" } });
    expect(firstNameInput).toHaveValue("Ahmet");
  });

  it("Kapat butonuna tıklayınca onClose çalışmalı", () => {
    const mockOnClose = jest.fn();
    render(<PersonelAddForm isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Kapat"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("Oluştur tıklanınca AddPersonel çağrılmalı ve fotoğraf yükleme yapılmalı", async () => {
    (AddPersonel as jest.Mock).mockResolvedValue({
      status: 201,
      data: { id: "p-1" },
    });
    (UploadPersonelProfileImage as jest.Mock).mockResolvedValue({
      status: 201,
    });

    render(<PersonelAddForm isOpen={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByTestId("profile-photo-picker")); // Foto ekleme
    fireEvent.click(screen.getByText("Oluştur"));

    await waitFor(() => {
      expect(AddPersonel).toHaveBeenCalled();
      expect(UploadPersonelProfileImage).toHaveBeenCalled();
      expect(showSuccess).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/personel-management/personels/p-1");
    });
  });

  it("Personel ID dönmezse showError çağrılmalı", async () => {
    (AddPersonel as jest.Mock).mockResolvedValue({
      status: 201,
      data: {},
    });

    render(<PersonelAddForm isOpen={true} onClose={jest.fn()} />);
    fireEvent.click(screen.getByText("Oluştur"));

    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith("Personel ID bulunamadı!");
    });
  });
});
