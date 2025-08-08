import { fireEvent, render, screen } from "@testing-library/react";

import SignInForm from "../components/SignInForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => "/dashboard",
  }),
}));

jest.mock("@/core/hooks/useModal", () => ({
  useModal: () => ({
    isOpen: false,
    openModal: jest.fn(),
    closeModal: jest.fn(),
  }),
}));

jest.mock("@/core/hooks/useRequestAction", () => ({
  useRequestAction: () => ({
    run: (fn: unknown) => (fn as () => void)(),
  }),
}));

jest.mock("../store/useAuthStore", () => ({
  useAuthStore: () => ({
    login: jest.fn().mockResolvedValue({ status: "success" }),
  }),
}));

jest.mock("../../user/store/useUserStore", () => ({
  useUserStore: () => ({
    fetchUser: jest.fn(),
    fetchIdentityUser: jest.fn(),
  }),
}));

describe("SignInForm", () => {
  it("renders form fields", () => {
    render(<SignInForm />);
    expect(screen.getByPlaceholderText("info@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("submits the form with valid inputs", async () => {
    render(<SignInForm />);

    fireEvent.change(screen.getByPlaceholderText("info@gmail.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Sign In")).toBeInTheDocument();
  });
});
