import { renderHook, act } from "@testing-library/react-hooks";
import { useAuthService } from "./useAuthService";
import useApi from "./useApi";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slices/auth-slice";

jest.mock("./useApi");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@chakra-ui/react", () => ({
  useToast: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
jest.mock("../store/slices/auth-slice", () => ({
  login: jest.fn(),
  logout: jest.fn(),
}));

describe("useAuthService", () => {
  const mockApi = {
    post: jest.fn(),
  };
  const mockRouterPush = jest.fn();
  const mockDispatch = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useApi as jest.Mock).mockReturnValue(mockApi);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("should login a user and store access token", async () => {
    const { result } = renderHook(() => useAuthService());

    const mockUserResponse = {
      id: "123",
      username: "testuser",
      email: "testuser@example.com",
      balance: 100,
      active: true,
      accessToken: "fake-token",
    };

    mockApi.post.mockResolvedValue(mockUserResponse);

    await act(async () => {
      await result.current.loginUser("testuser", "password123");
    });

    expect(mockApi.post).toHaveBeenCalledWith("/login", {
      username: "testuser",
      password: "password123",
    });
    expect(mockDispatch).toHaveBeenCalledWith(
      login({
        user: mockUserResponse,
        accessToken: mockUserResponse.accessToken,
      })
    );
    expect(sessionStorage.getItem("accessToken")).toBe("fake-token");
  });

  it("should show an error toast and throw an error when login fails", async () => {
    const { result } = renderHook(() => useAuthService());

    mockApi.post.mockRejectedValue(new Error("Invalid credentials"));

    const expectedErrorMessage = "Login failed: An unexpected error occurred";

    await expect(
      act(async () => {
        await result.current.loginUser("testuser", "wrongpassword");
      })
    ).rejects.toThrow(expectedErrorMessage);

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Action failed",
        description: expect.stringContaining("Login failed:"),
      })
    );
  });

  it("should show an error toast and throw an error when user is inactive", async () => {
    const { result } = renderHook(() => useAuthService());

    mockApi.post.mockResolvedValue({ active: false });

    const expectedErrorMessage = "Login failed: An unexpected error occurred";

    await expect(
      result.current.loginUser("inactiveUser", "password123")
    ).rejects.toThrow(expectedErrorMessage);

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Action failed",
        description: expectedErrorMessage,
      })
    );
  });

  it("should log out the user and redirect to login page", async () => {
    const { result } = renderHook(() => useAuthService());

    mockDispatch.mockImplementation(() => {});

    await act(async () => {
      await result.current.logoutUser();
    });

    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("should show an error toast when logout fails", async () => {
    const { result } = renderHook(() => useAuthService());

    const expectedErrorMessage = "Logout failed. Please try again.";

    mockDispatch.mockImplementationOnce(() => {
      throw new Error(expectedErrorMessage);
    });

    await expect(
      act(async () => {
        await result.current.logoutUser();
      })
    ).rejects.toThrow(expectedErrorMessage);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Action failed",
      description: expectedErrorMessage,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  });
});
