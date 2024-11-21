import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import OperationsForm from ".";
import { configureStore } from "@reduxjs/toolkit";
import operationsReducer from "@/app/store/slices/operations-slice";
import { useOperationService } from "@/app/hooks/useOperationService";
import { OperationType } from "@/shared/interfaces/operations";

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  configurable: true,
  value: jest.fn(),
});

jest.mock("@/app/hooks/useOperationService", () => ({
  useOperationService: jest.fn(),
}));

const mockUseOperationService = jest.mocked(useOperationService);

const createTestStore = () =>
  configureStore({
    reducer: operationsReducer,
  });

describe("OperationsForm", () => {
  beforeEach(() => {
    mockUseOperationService.mockReturnValue({
      performOperation: jest.fn(() =>
        Promise.resolve({
          id: "rec1",
          operation: {
            id: "op1",
            type: "SQUARE_ROOT" as OperationType,
            cost: 5,
          },
          user: "user1",
          amount: 2,
          userBalance: 4,
          operationResponse: "3",
          date: "2024-11-20T10:00:00Z",
          deleted: false,
        })
      ),
      useOperations: jest.fn(() => ({
        isLoading: false,
        error: null,
        operations: [
          { id: "1", type: "ADDITION", cost: 5 },
          { id: "2", type: "SUBTRACTION", cost: 3 },
          { id: "3", type: "SQUARE_ROOT", cost: 5 },
        ],
      })),
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ChakraProvider>{ui}</ChakraProvider>
      </Provider>
    );
  };

  it("should render the form with initial elements", async () => {
    renderWithProviders(<OperationsForm />);

    expect(screen.getByText("Arithmetic Operations")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Select an operation/i })
    ).toBeInTheDocument();
    expect(await screen.findByTestId("input-field-1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Perform Operation/i })
    ).toBeDisabled();
  });

  it("should validate input values", async () => {
    renderWithProviders(<OperationsForm />);

    const inputField1 = await screen.findByTestId("input-field-1");

    await userEvent.type(inputField1, "abc");

    expect(
      screen.getByText("Only numeric values are allowed.")
    ).toBeInTheDocument();
  });

  it("should allow selecting an operation and updating input values", async () => {
    renderWithProviders(<OperationsForm />);

    const operationSelect = screen.getByRole("combobox", {
      name: /Select an operation/i,
    });

    await userEvent.click(operationSelect);
    const additionOption = await screen.findByText("ADDITION (Cost: 5)");
    await userEvent.click(additionOption);

    expect(operationSelect).toHaveTextContent("ADDITION");

    const inputField1 = await screen.findByTestId("input-field-1");
    const inputField2 = await screen.findByTestId("input-field-2");

    await userEvent.type(inputField1, "10");
    await userEvent.type(inputField2, "20");

    expect(inputField1).toHaveValue("10");
    expect(inputField2).toHaveValue("20");
  });

  it("should perform the operation and display the result", async () => {
    renderWithProviders(<OperationsForm />);

    const operationSelect = screen.getByRole("combobox", {
      name: /Select an operation/i,
    });
    const inputField1 = await screen.findByTestId("input-field-1");

    const performOperationButton = screen.getByRole("button", {
      name: /Perform Operation/i,
    });

    await userEvent.click(operationSelect);
    const additionOption = await screen.findByText("SQUARE_ROOT (Cost: 5)");
    await userEvent.click(additionOption);

    await userEvent.type(inputField1, "9");

    await waitFor(() => {
      expect(performOperationButton).toBeEnabled();
    });

    await userEvent.click(performOperationButton);

    const result = await screen.findByText(/Result: 3/i);
    expect(result).toBeInTheDocument();
  });

  it("should show a spinner while loading operations", () => {
    mockUseOperationService.mockReturnValueOnce({
      performOperation: jest.fn(),
      useOperations: jest.fn(() => ({
        isLoading: true,
        error: null,
        operations: [],
      })),
    });

    renderWithProviders(<OperationsForm />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("should display an error when fetching operations fails", async () => {
    mockUseOperationService.mockReturnValueOnce({
      performOperation: jest.fn(),
      useOperations: jest.fn(() => ({
        isLoading: false,
        error: new Error("Failed to fetch operations"),
        operations: [],
      })),
    });

    renderWithProviders(<OperationsForm />);
    expect(
      await screen.findByText("Failed to fetch operations")
    ).toBeInTheDocument();
  });
});
