import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import TeamMembersEditForm from "../../components/forms/TeamMembersEditForm";

jest.mock("../../service/teamService", () => ({
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
const fetchPersonelOptionsMock = jest.fn();

jest.mock("../../store/useTeamStore", () => ({
  useTeamStore: () => ({
    team: {
      id: "team-1",
      isActive: true,
      name: "Mevcut Takım",
      teamCode: "T001",
      personels: [
        { id: "1", firstName: "Ali", lastName: "Veli", personelCode: "P01" },
        { id: "2", firstName: "Ayşe", lastName: "Fatma", personelCode: "P02" },
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

jest.mock("@/features/personel/store/usePersonelStore", () => ({
  usePersonelStore: () => ({
    personelOptions: {
      items: [
        { id: "1", firstName: "Ali", lastName: "Veli", personelCode: "P01" },
        { id: "2", firstName: "Ayşe", lastName: "Fatma", personelCode: "P02" },
        { id: "3", firstName: "Mehmet", lastName: "Can", personelCode: "P03" },
      ],
    },
    fetchPersonelOptions: fetchPersonelOptionsMock,
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

import { UpdateTeam } from "../../service/teamService";

describe("TeamMembersEditForm", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Form başlıkları render olur ve select gösterilir", () => {
    render(<TeamMembersEditForm isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByText("Ekip Personel Güncelle")).toBeInTheDocument();
    expect(
      screen.getByText("Ekip bilgilerini güncel tutmak için yeni bilgileri girin"),
    ).toBeInTheDocument();

    // Burada heading 5 (h5) elementini ve içeriğini kontrol ediyoruz
    expect(screen.getByRole("heading", { level: 5, name: "Ekip Üyeleri" })).toBeInTheDocument();

    // React Select için combobox rolü ile erişim
    const selectInput = screen.getByRole("combobox");
    expect(selectInput).toBeInTheDocument();
  });

  test("Select ile personel seçimi değiştirildiğinde setUpdateField çağrılır", async () => {
    render(<TeamMembersEditForm isOpen={true} onClose={onCloseMock} />);

    // react-select elementini açmak için inputu seçip tıkla
    const selectInput = screen.getByRole("combobox");
    await userEvent.click(selectInput);

    // Açılan seçeneklerden "Mehmet Can" seçilir
    const option = screen.getByText("Mehmet Can | P03");
    await userEvent.click(option);

    // setUpdateField personelIds ile çağrılmalı
    expect(setUpdateFieldMock).toHaveBeenCalledWith("personelIds", expect.arrayContaining(["3"]));
  });

  test("Kapat butonuna tıklanınca onClose çağrılır", async () => {
    render(<TeamMembersEditForm isOpen={true} onClose={onCloseMock} />);
    const closeButton = screen.getByText("Kapat");
    await userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Kaydet butonuna tıklanınca UpdateTeam çağrılır ve işlemler yapılır", async () => {
    (UpdateTeam as jest.Mock).mockResolvedValue({ status: 200 });

    render(<TeamMembersEditForm isOpen={true} onClose={onCloseMock} />);

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
      expect(showSuccess).toHaveBeenCalledWith("Ekip Üyeleri Güncellendi.");
      expect(clearErrorsMock).toHaveBeenCalled();
      expect(fetchTeamMock).toHaveBeenCalledWith("team-1");
    });
  });
});
