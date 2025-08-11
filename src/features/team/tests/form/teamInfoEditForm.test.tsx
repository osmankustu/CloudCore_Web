import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import TeamInfoEditForm from "../../components/forms/TeamInfoEditForm";

jest.mock("../../service/teamService.ts", () => ({
  UpdateTeam: jest.fn(),
}));

jest.mock("@/core/hooks/useRequestAction", () => ({
  useRequestAction: () => ({
    run: (fn: () => Promise<void> | void) => fn(),
    isLoading: false,
  }),
}));

const fetchTeamMock = jest.fn();
const setUpdateFormDataMock = jest.fn();
const setUpdateFieldMock = jest.fn();

jest.mock("../../store/useTeamStore", () => ({
  useTeamStore: () => ({
    team: {
      id: "team-1",
      isActive: true,
      name: "Mevcut Takım",
      teamCode: "T001",
      personels: [
        { id: "1", firstName: "Ali" },
        { id: "2", firstName: "Ayşe" },
      ],
      createAt: "2023-01-01",
    },
    updateFormData: {
      id: "team-1",
      isActive: true,
      name: "Mevcut Takım",
      teamCode: "T001",
      personelIds: ["1", "2"],
      createAt: "2023-01-01",
    },
    fetchTeam: fetchTeamMock,
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

import { UpdateTeam } from "../../service/teamService";

describe("TeamInfoEditForm", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Form başlıkları ve mevcut ekip adı render olur", () => {
    render(<TeamInfoEditForm isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText("Ekip Bilgileri Güncelle")).toBeInTheDocument();
    expect(
      screen.getByText("Ekip bilgilerini güncel tutmak için yeni bilgileri girin"),
    ).toBeInTheDocument();

    const nameInput = screen.getByRole("textbox", { name: /Ekip Adı/i });
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue("Mevcut Takım");

    // Switch için label görünmeli
    expect(screen.getByText(/Aktif|Pasif/)).toBeInTheDocument();

    // Butonlar
    expect(screen.getByText("Kapat")).toBeInTheDocument();
    expect(screen.getByText("Kaydet")).toBeInTheDocument();
  });

  //   test("Ekip adı inputu değiştiğinde setUpdateField çağrılır", async () => {
  //     render(<TeamInfoEditForm isOpen={true} onClose={onCloseMock} />);

  //     const nameInput = screen.getByRole("textbox", { name: /Ekip Adı/i });
  //     await userEvent.clear(nameInput);
  //     await userEvent.type(nameInput, "Yeni Takım İsmi");

  //     // En son çağrının doğru değerle yapıldığı kontrolü
  //     const calls = setUpdateFieldMock.mock.calls;
  //     const lastCall = calls[calls.length - 1];
  //     expect(lastCall).toEqual(["name", "Yeni Takım İsmi"]);
  //   });

  test("Switch değiştiğinde setUpdateField çağrılır", async () => {
    render(<TeamInfoEditForm isOpen={true} onClose={onCloseMock} />);

    // Switch bileşenindeki checkbox rolü olabilir ya da role göre alma gerekebilir
    // Burada label ile kontrol ediyoruz
    const switchLabel = screen.getByText(/Aktif|Pasif/);
    await userEvent.click(switchLabel);

    // Switch'in yeni değeri false olmalı (toggle)
    expect(setUpdateFieldMock).toHaveBeenCalledWith("isActive", expect.any(Boolean));
  });

  test("Kapat butonuna tıklanınca onClose çağrılır", async () => {
    render(<TeamInfoEditForm isOpen={true} onClose={onCloseMock} />);
    const closeButton = screen.getByText("Kapat");
    await userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Kaydet butonuna tıklanınca UpdateTeam çağrılır ve işlemler yapılır", async () => {
    (UpdateTeam as jest.Mock).mockResolvedValue({ status: 200 });

    render(<TeamInfoEditForm isOpen={true} onClose={onCloseMock} />);

    const saveButton = screen.getByText("Kaydet");
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(UpdateTeam).toHaveBeenCalledWith({
        id: "team-1",
        isActive: true,
        name: "Mevcut Takım",
        teamCode: "T001",
        personelIds: ["1", "2"],
        createAt: "2023-01-01",
      });
      expect(onCloseMock).toHaveBeenCalled();
      expect(showSuccess).toHaveBeenCalledWith("Ekip Bilgileri Güncellendi.");
      expect(clearErrorsMock).toHaveBeenCalled();
      expect(fetchTeamMock).toHaveBeenCalledWith("team-1");
    });
  });
});
