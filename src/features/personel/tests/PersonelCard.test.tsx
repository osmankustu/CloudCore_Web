import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useRequestAction } from "@/core/hooks/useRequestAction";
import { usePersonelStore } from "@/features/personel/store/usePersonelStore";

import PersonelCard from "../components/cards/PersonelCard";

type MetaCardMockProps = {
  personel: MockPersonel;
  setActive: (value: string) => void;
};

type MockPersonel = {
  name: string;
  lastname: string;
  id: string;
};

// Mock child components to avoid deep render
// PersonelMetaCard mock
jest.mock("@/features/personel/components/cards/PersonelMetaCard", () => {
  const MockPersonelMetaCard = ({ personel, setActive }: MetaCardMockProps) => (
    <div data-testid="meta-card">
      MetaCard - {personel.name}
      <button onClick={() => setActive("Reports")}>Go Reports</button>
    </div>
  );
  MockPersonelMetaCard.displayName = "MockPersonelMetaCard";
  return MockPersonelMetaCard;
});

// PersonelInfoCard mock
jest.mock("@/features/personel/components/cards/PersonelInfoCard", () => {
  const MockPersonelInfoCard = ({ personel }: { personel: MockPersonel }) => (
    <div data-testid="info-card">InfoCard - {personel.name}</div>
  );
  MockPersonelInfoCard.displayName = "MockPersonelInfoCard";
  return MockPersonelInfoCard;
});

// PersonelContactCard mock
jest.mock("@/features/personel/components/cards/PersonelContactCard", () => {
  const MockPersonelContactCard = ({ personel }: { personel: MockPersonel }) => (
    <div data-testid="contact-card">ContactCard - {personel.name}</div>
  );
  MockPersonelContactCard.displayName = "MockPersonelContactCard";
  return MockPersonelContactCard;
});

// PersonelAddressCard mock
jest.mock("@/features/personel/components/cards/PersonelAddressCard", () => {
  const MockPersonelAddressCard = () => <div data-testid="address-card">AddressCard</div>;
  MockPersonelAddressCard.displayName = "MockPersonelAddressCard";
  return MockPersonelAddressCard;
});

// Spinner mock
jest.mock("@/components/ui/spinner/Spinner", () => {
  const MockSpinner = () => <div data-testid="spinner">Loading...</div>;
  MockSpinner.displayName = "MockSpinner";
  return MockSpinner;
});

// Mock hooks
const mockFetchPersonel = jest.fn();
const mockedPersonel: MockPersonel = { id: "123", name: "osman", lastname: "kustu" };
const mockRun = jest.fn(fn => fn());

jest.mock("@/features/personel/store/usePersonelStore", () => ({
  usePersonelStore: jest.fn(),
}));
jest.mock("@/core/hooks/useRequestAction", () => ({
  useRequestAction: jest.fn(),
}));

describe("PersonelCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRequestAction as jest.Mock).mockReturnValue({ run: mockRun });
  });

  it("spinner görünmeli veri yokken", () => {
    (usePersonelStore as unknown as jest.Mock).mockReturnValue({
      personel: undefined,
      fetchPersonel: mockFetchPersonel,
    });

    render(<PersonelCard personelId="123" />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(mockRun).toHaveBeenCalled();
    expect(mockFetchPersonel).toHaveBeenCalledWith("123");
  });

  it("veri geldiğinde kartlar render edilmeli", () => {
    (usePersonelStore as unknown as jest.Mock).mockReturnValue({
      personel: mockedPersonel,
      fetchPersonel: mockFetchPersonel,
    });

    render(<PersonelCard personelId="123" />);
    expect(screen.getByTestId("meta-card")).toHaveTextContent("osman");
    expect(screen.getByTestId("info-card")).toHaveTextContent("osman");
    expect(screen.getByTestId("contact-card")).toHaveTextContent("osman");
    expect(screen.getByTestId("address-card")).toBeInTheDocument();
  });

  it("sekme değişince ilgili içerik görünmeli", async () => {
    (usePersonelStore as unknown as jest.Mock).mockReturnValue({
      personel: { name: "John Doe" },
      fetchPersonel: mockFetchPersonel,
    });

    render(<PersonelCard personelId="123" />);

    fireEvent.click(screen.getByText("Go Reports"));

    await waitFor(() => {
      expect(screen.getByText(/Servis Kayıtlarına Ait Raporlar Listelenecek/i)).toBeInTheDocument();
    });
  });
});
