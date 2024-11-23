import { render, fireEvent, waitFor } from "@testing-library/react";
import LoginBox from ".";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

// Mocks globais
const mockLoginUser = jest.fn();
const mockToast = jest.fn();
const mockPush = jest.fn();

jest.mock("@/app/hooks/useAuthService", () => ({
  useAuthService: () => ({
    loginUser: mockLoginUser,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

describe("LoginBox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  it("should render LoginBox correctly", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<LoginBox />);

    expect(getByText(/Welcome back!/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Type your username/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Type your password/i)).toBeInTheDocument();
    expect(getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should update username and password fields", () => {
    const { getByPlaceholderText } = render(<LoginBox />);

    const usernameInput = getByPlaceholderText(/Type your username/i);
    const passwordInput = getByPlaceholderText(/Type your password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should show success toast and navigate to homepage on successful login", async () => {
    mockLoginUser.mockResolvedValueOnce(undefined);

    const { getByPlaceholderText, getByRole } = render(<LoginBox />);

    fireEvent.change(getByPlaceholderText(/Type your username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText(/Type your password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith("testuser", "password123");
      expect(mockPush).toHaveBeenCalledWith("/");
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Success",
          description: "Login successful.",
          status: "success",
        })
      );
    });
  });

  it("should show error toast on failed login", async () => {
    mockLoginUser.mockRejectedValueOnce(new Error("Invalid credentials"));

    const { getByPlaceholderText, getByRole } = render(<LoginBox />);

    fireEvent.change(getByPlaceholderText(/Type your username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText(/Type your password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith("testuser", "wrongpassword");
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: "Login failed: Error: Invalid credentials",
          status: "error",
        })
      );
    });
  });

  it("should show loading indicator during login", async () => {
    mockLoginUser.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 500))
    );

    const { getByPlaceholderText, getByRole } = render(<LoginBox />);

    fireEvent.change(getByPlaceholderText(/Type your username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText(/Type your password/i), {
      target: { value: "password123" },
    });

    const loginButton = getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(loginButton).toBeDisabled();

    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });
  });
});
