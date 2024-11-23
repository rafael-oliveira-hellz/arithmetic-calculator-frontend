import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/store/slices/auth-slice";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { useToast } from "@chakra-ui/react";
import LoginPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

jest.mock("../../hooks/useAuthService", () => ({
  useAuthService: () => ({
    loginUser: jest.fn().mockRejectedValue(new Error("Invalid credentials")),
  }),
}));

const mockToast = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();

  (useToast as jest.Mock).mockReturnValue(mockToast);
});

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return render(
    <Provider store={store}>
      <ChakraProvider>
        <MemoryRouterProvider>{ui}</MemoryRouterProvider>
      </ChakraProvider>
    </Provider>
  );
};

describe("LoginPage", () => {
  it("should render the login page", () => {
    renderWithProviders(<LoginPage />);
    expect(
      screen.getByPlaceholderText("Type your username")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type your password")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should update input fields when typing", () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Type your username");
    const passwordInput = screen.getByPlaceholderText("Type your password");

    fireEvent.change(emailInput, { target: { value: "testuser@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(emailInput).toHaveValue("testuser@test.com");
    expect(passwordInput).toHaveValue("testpassword");
  });

  it("should disable login button when fields are empty", () => {
    renderWithProviders(<LoginPage />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();
  });

  it("should enable login button when fields are filled", () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByPlaceholderText("Type your username");
    const passwordInput = screen.getByPlaceholderText("Type your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "testuser@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(loginButton).toBeEnabled();
  });

  it("should show an error message when login fails", async () => {
    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Type your username");
    const passwordInput = screen.getByPlaceholderText("Type your password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "testuser@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    jest.spyOn(console, "error").mockImplementation(() => {});

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining("Error"),
          description: expect.stringContaining("Login failed"),
        })
      );
    });
  });
});
