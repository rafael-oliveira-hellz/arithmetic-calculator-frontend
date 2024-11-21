import authReducer, { login, logout, updateBalance } from "./auth-slice";
import { AuthState } from "@/shared/types/auth-state";
import { IUser } from "@/shared/types/user";

jest.mock("@/app/utils/storage", () => ({
  storage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  },
}));

const { storage } = jest.requireMock("@/app/utils/storage");

describe("authSlice", () => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    balance: 0,
    accessToken: "",
  };

  it("should handle initial state", () => {
    const state = authReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  it("should handle login", () => {
    const user: IUser = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
      active: true,
      balance: 1000,
      accessToken: "mockAccessToken",
    };
    const accessToken = "mockAccessToken";

    const newState = authReducer(initialState, login({ user, accessToken }));

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toEqual(user);
    expect(newState.balance).toBe(user.balance);
    expect(newState.accessToken).toBe(accessToken);
    expect(storage.setItem).toHaveBeenCalledWith("accessToken", accessToken);
  });

  it("should handle logout", () => {
    const loggedInState: AuthState = {
      isAuthenticated: true,
      user: {
        id: "1",
        username: "testuser",
        email: "test@example.com",
        active: true,
        balance: 1000,
        accessToken: "mockAccessToken",
      },
      balance: 1000,
      accessToken: "mockAccessToken",
    };

    const newState = authReducer(loggedInState, logout());

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.user).toBe(null);
    expect(newState.balance).toBe(0);
    expect(newState.accessToken).toBe("");
    expect(storage.clear).toHaveBeenCalled();
  });

  it("should handle updateBalance", () => {
    const loggedInState: AuthState = {
      isAuthenticated: true,
      user: {
        id: "1",
        username: "testuser",
        email: "test@example.com",
        active: true,
        balance: 1000,
        accessToken: "mockAccessToken",
      },
      balance: 1000,
      accessToken: "mockAccessToken",
    };

    const newBalance = 2000;
    const newState = authReducer(loggedInState, updateBalance(newBalance));

    expect(newState.balance).toBe(newBalance);
  });
});
