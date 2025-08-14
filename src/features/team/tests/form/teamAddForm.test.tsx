import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import TeamAddForm from "../../components/forms/TeamAddForm";

jest.mock("../../service/teamService", () => ({
  AddTeam: jest.fn(),
}));

jest.mock("@/core/hooks/useRequestAction", () => ({
  useRequestAction: () => ({
    run: (fn: () => Promise<void> | void) => fn(),
    isLoading: false,
  }),
}));

jest.mock("@/features/personel/store/usePersonelStore", () => ({
  usePersonelStore: () => ({
    personelOptions: {
      items: [
        { id: "1", firstName: "Ali", lastName: "Veli", personelCode: "P001" },
        { id: "2", firstName: "Ayşe", lastName: "Fatma", personelCode: "P002" },
      ],
    },
    fetchPersonelOptions: jest.fn(),
  }),
}));

// useTeamStore'un mocku ve fetchTeams jest.fn() dışa aktarılıyor:
const fetchTeamsMock = jest.fn();
jest.mock("../../store/useTeamStore", () => ({
  useTeamStore: () => ({
    fetchTeams: fetchTeamsMock,
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

import { showSuccess } from "@/core/utils/toast/toastHelper";

import { AddTeam } from "../../service/teamService";

describe("TeamAddForm", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Form başlıkları ve inputlar render olur", () => {
    render(<TeamAddForm isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText("Ekip Oluştur")).toBeInTheDocument();
    expect(screen.getByLabelText("Ekip Adı")).toBeInTheDocument();
    expect(screen.getByText("Ekip Üyeleri")).toBeInTheDocument();
  });

  test("Ekip Adı inputuna yazılabilir", async () => {
    render(<TeamAddForm isOpen={true} onClose={onCloseMock} />);
    const input = screen.getByLabelText("Ekip Adı") as HTMLInputElement;

    await userEvent.type(input, "Yeni Takım");
    expect(input.value).toBe("Yeni Takım");
  });

  test("Select bileşeninden çoklu seçim yapılabilir", async () => {
    render(<TeamAddForm isOpen={true} onClose={onCloseMock} />);

    // React-Select combobox inputu alıyoruz
    const selectInput = screen.getByRole("combobox");

    const user = userEvent.setup();

    // Dropdown'u açmak için tıkla ve ArrowDown gönder
    await user.click(selectInput);
    await user.keyboard("{ArrowDown}");

    // İlk seçeneği seç
    const option1 = await screen.findByText("Ali Veli | P001");
    await user.click(option1);

    // Tekrar açılıp ikinci seçeneği seç
    await user.click(selectInput);
    await user.keyboard("{ArrowDown}");
    const option2 = await screen.findByText(content => content.includes("Ayşe Fatma | P002"));
    await user.click(option2);

    // Seçilenlerin görünüp görünmediğini kontrol et
    expect(screen.getByText("Ali Veli | P001")).toBeInTheDocument();
    expect(screen.getByText("Ayşe Fatma | P002")).toBeInTheDocument();
  });

  test("Kapat butonuna tıklanınca onClose çağrılır", async () => {
    render(<TeamAddForm isOpen={true} onClose={onCloseMock} />);
    const closeButton = screen.getByText("Kapat");
    await userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Oluştur butonuna tıklanınca AddTeam çağrılır ve işlemler yapılır (personel seçimi dahil)", async () => {
    (AddTeam as jest.Mock).mockResolvedValue({ status: 201 });

    render(<TeamAddForm isOpen={true} onClose={onCloseMock} />);

    const user = userEvent.setup();

    // Ekip adı inputuna yaz
    const input = screen.getByLabelText("Ekip Adı");
    await user.type(input, "Test Takımı");

    // React-Select combobox inputu al ve aç
    const selectInput = screen.getByRole("combobox");
    await user.click(selectInput);
    await user.keyboard("{ArrowDown}");

    // İlk personel seçeneğini seç
    const option1 = await screen.findByText("Ali Veli | P001");
    await user.click(option1);

    // Dropdown'u tekrar aç ve ikinci personel seçeneğini seç
    await user.click(selectInput);
    await user.keyboard("{ArrowDown}");
    const option2 = await screen.findByText(content => content.includes("Ayşe Fatma | P002"));
    await user.click(option2);

    // Oluştur butonuna tıkla
    const createButton = screen.getByText("Oluştur");
    await user.click(createButton);

    // AddTeam fonksiyonunun formData ile doğru çağrıldığını bekle
    await waitFor(() => {
      expect(AddTeam).toHaveBeenCalledWith({
        name: "Test Takımı",
        personelIds: ["1", "2"], // seçilen personellerin ID'leri
      });
      expect(onCloseMock).toHaveBeenCalled();
      expect(showSuccess).toHaveBeenCalledWith("Takım Oluşturuldu");
      expect(fetchTeamsMock).toHaveBeenCalledWith(0, 20);
      expect(clearErrorsMock).toHaveBeenCalled();
    });
  });
});
