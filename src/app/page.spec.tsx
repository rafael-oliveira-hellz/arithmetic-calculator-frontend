import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import Home from "./page";
import authReducer from "./store/slices/auth-slice";
import { AuthState } from "@/shared/types/auth-state";
import "@testing-library/jest-dom";

jest.mock("./components/guards/auth-guard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-guard">{children}</div>
  ),
}));

jest.mock("./components/organisms/OperationForm", () => ({
  __esModule: true,
  default: () => <div data-testid="operations-form">OperationsForm</div>,
}));

jest.mock("./components/organisms/RecordsTable", () => ({
  __esModule: true,
  default: () => <div data-testid="records-table">RecordsTable</div>,
}));

describe("Home Component", () => {
  const renderComponent = (preloadedState: { auth: AuthState }) => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState,
    });

    return render(
      <Provider store={store}>
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      </Provider>
    );
  };

  const initialState: AuthState = {
    isAuthenticated: true,
    user: {
      id: "1",
      username: "testuser",
      email: "pF8y6@example.com",
      active: true,
      balance: 1000,
      accessToken: "mockAccessToken",
    },
    balance: 1000,
    accessToken: "mockAccessToken",
  };

  it("should render AuthGuard", () => {
    renderComponent({ auth: initialState });
    expect(screen.getByTestId("auth-guard")).toBeInTheDocument();
  });

  it("should display the balance correctly", () => {
    renderComponent({ auth: initialState });
    expect(screen.getByText("Balance")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  it("should render OperationsForm", () => {
    renderComponent({ auth: initialState });
    expect(screen.getByTestId("operations-form")).toBeInTheDocument();
  });
});
