import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import operationsReducer from "@/app/store/slices/operations-slice";
import { useOperationService } from "@/app/hooks/useOperationService";
import OperationsForm from ".";
import { OperationType } from "@/shared/interfaces/operations";

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  configurable: true,
  value: jest.fn(),
});

const mockPerformOperation = jest.fn(() =>
  Promise.resolve({
    id: "bf132c57-de0a-41b0-8969-f526acfcdab9",
    operation: {
      id: "a7b9cf26-0e77-446c-ac15-eddd5f1dbd9f",
      type: "SUBTRACTION" as OperationType,
      cost: 5,
    },
    user: "23ac8a9a-d0e1-70b8-d06e-8e1fd86269fd",
    amount: 5,
    userBalance: 30,
    operationResponse: "1",
    date: "2024-11-21T10:13:31",
    deleted: false,
  })
);

jest.mock("@/app/hooks/useOperationService", () => ({
  useOperationService: jest.fn(() => ({
    performOperation: mockPerformOperation,
    useOperations: jest.fn(() => ({
      isLoading: false,
      error: null,
      operations: [
        { id: "1", type: "ADDITION" as OperationType, cost: 5 },
        { id: "2", type: "SUBTRACTION" as OperationType, cost: 5 },
      ],
    })),
  })),
}));

const mockUseOperationService = jest.mocked(useOperationService);

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: { operations: operationsReducer },
  });
  render(
    <Provider store={store}>
      <ChakraProvider>{ui}</ChakraProvider>
    </Provider>
  );
};

describe("OperationsForm", () => {
  beforeEach(() => {
    mockUseOperationService.mockReturnValue({
      performOperation: jest.fn(),
      useOperations: jest.fn(() => ({
        isLoading: false,
        error: null,
        operations: [
          { id: "1", type: "ADDITION", cost: 5 },
          { id: "2", type: "SUBTRACTION", cost: 5 },
          { id: "3", type: "DIVISION", cost: 5 },
          { id: "4", type: "SQUARE_ROOT", cost: 5 },
        ],
      })),
    });
  });

  it("should validate insufficient balance and show warning", async () => {
    renderWithProviders(<OperationsForm balance={2} />);

    const operationSelect = screen.getByRole("combobox");
    await userEvent.click(operationSelect);

    const squareRootOption = await screen.findByText(
      /SQUARE_ROOT \(Cost: 5\)/i
    );
    await userEvent.click(squareRootOption);

    const inputField1 = screen.getByTestId("input-field-1");
    await userEvent.type(inputField1, "9");

    const warnings = await screen.findAllByText(
      "Insufficient balance to perform this operation."
    );

    expect(warnings.some((warning) => warning.textContent)).toBeTruthy();

    const performOperationButton = screen.getByRole("button", {
      name: /Perform Operation/i,
    });
    expect(performOperationButton).toBeDisabled();
  });

  it("should perform addition operation successfully", async () => {
    mockUseOperationService.mockReturnValue({
      performOperation: mockPerformOperation,
      useOperations: jest.fn(() => ({
        isLoading: false,
        error: null,
        operations: [{ id: "1", type: "ADDITION", cost: 5 }],
      })),
    });

    renderWithProviders(<OperationsForm balance={50} />);

    const operationSelect = screen.getByRole("combobox");
    await userEvent.click(operationSelect);

    const additionOption = await screen.findByText(/ADDITION \(Cost: 5\)/i);
    await userEvent.click(additionOption);

    const inputField1 = screen.getByTestId("input-field-1");
    const inputField2 = screen.getByTestId("input-field-2");

    await userEvent.type(inputField1, "10");
    await userEvent.type(inputField2, "5");

    const performOperationButton = screen.getByRole("button", {
      name: /Perform Operation/i,
    });
    expect(performOperationButton).not.toBeDisabled();

    await userEvent.click(performOperationButton);

    const result = await screen.findByText(/Result: 1/i);
    expect(result).toBeInTheDocument();

    expect(mockPerformOperation).toHaveBeenCalledWith("addition", {
      value1: 10,
      value2: 5,
    });
  });
});
