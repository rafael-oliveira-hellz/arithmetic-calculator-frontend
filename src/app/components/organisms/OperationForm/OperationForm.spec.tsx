import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OperationsForm from ".";
import { useOperationService } from "@/app/hooks/useOperationService";
import { useToast } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

Object.defineProperty(window.HTMLElement.prototype, "scrollTo", {
  configurable: true,
  value: jest.fn(),
});

jest.mock("@/app/hooks/useOperationService");
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

describe("OperationsForm Component", () => {
  const mockPerformOperation = jest.fn();
  const mockOperations = [
    { id: 1, type: "ADDITION", cost: 1 },
    { id: 2, type: "SUBTRACTION", cost: 1 },
    { id: 3, type: "MULTIPLICATION", cost: 1 },
    { id: 4, type: "DIVISION", cost: 1 },
    { id: 5, type: "SQUARE_ROOT", cost: 1 },
  ];

  beforeEach(() => {
    (useOperationService as jest.Mock).mockReturnValue({
      performOperation: mockPerformOperation,
      useOperations: () => ({
        operations: mockOperations,
        error: null,
        isLoading: false,
      }),
    });
    (useToast as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component without crashing", () => {
    render(<OperationsForm balance={10} />);
    expect(screen.getByText("Arithmetic Operations")).toBeInTheDocument();
  });

  it("displays loading spinner when operations are loading", () => {
    (useOperationService as jest.Mock).mockReturnValue({
      performOperation: mockPerformOperation,
      useOperations: () => ({
        operations: null,
        error: null,
        isLoading: true,
      }),
    });
    render(<OperationsForm balance={10} />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("displays error message when operations fail to load", () => {
    (useOperationService as jest.Mock).mockReturnValue({
      performOperation: mockPerformOperation,
      useOperations: () => ({
        operations: null,
        error: new Error("Failed to fetch operations"),
        isLoading: false,
      }),
    });
    render(<OperationsForm balance={10} />);
    expect(screen.getByText("Failed to fetch operations")).toBeInTheDocument();
  });

  it("allows selecting an operation", () => {
    render(<OperationsForm balance={10} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "ADDITION" } });
    expect(select).toHaveValue("ADDITION");
  });

  it("shows second input field when operation requires two inputs", async () => {
    render(<OperationsForm balance={10} />);
    const user = userEvent.setup();

    const selectButton = screen.getByRole("combobox");
    await user.click(selectButton);

    const additionOption = await screen.findByText(/ADDITION \(Cost: 1\)/i);
    await user.click(additionOption);

    const inputField1 = screen.getByLabelText("Enter the first value");

    expect(inputField1).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByLabelText("Enter the second value")
      ).toBeInTheDocument();
    });
  });

  it("validates inputs correctly", () => {
    render(<OperationsForm balance={10} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "ADDITION" } });

    const inputField1 = screen.getByTestId("input-field-1");
    fireEvent.change(inputField1, { target: { value: "abc" } });
    expect(
      screen.getByText("Only numeric values are allowed.")
    ).toBeInTheDocument();
  });

  it("validates division by zero", async () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue(toastMock);
    render(<OperationsForm balance={10} />);
    const user = userEvent.setup();

    const selectButton = screen.getByRole("combobox");
    await user.click(selectButton);

    const divisionOption = await screen.findByText(/DIVISION \(Cost: 1\)/i);
    await user.click(divisionOption);

    const inputField1 = await screen.findByTestId("input-field-1");
    await user.type(inputField1, "10");

    const inputField2 = await screen.findByTestId("input-field-2");
    await user.type(inputField2, "0");

    const button = screen.getByText("Perform Operation");
    await user.click(button);

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: "Validation Error",
        description: "Division by zero is not allowed.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Division by zero is not allowed."
      );
    });
  });

  it("validates square root of a negative number", async () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue(toastMock);
    render(<OperationsForm balance={10} />);
    const user = userEvent.setup();

    const selectButton = screen.getByRole("combobox");
    await user.click(selectButton);

    const sqrtOption = await screen.findByText(/SQUARE_ROOT/i);
    await user.click(sqrtOption);

    const inputField1 = await screen.findByTestId("input-field-1");
    await user.type(inputField1, "-9");

    const button = screen.getByText("Perform Operation");
    await user.click(button);

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: "Validation Error",
        description: "Square root of a negative number is not allowed.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Square root of a negative number is not allowed."
      );
    });
  });

  it("calls performOperation when form is submitted", async () => {
    mockPerformOperation.mockResolvedValue({ operationResponse: "5" });
    render(<OperationsForm balance={10} />);
    const user = userEvent.setup();

    const selectButton = screen.getByRole("combobox");
    await user.click(selectButton);

    const additionOption = await screen.findByText(/ADDITION \(Cost: 1\)/i);
    await user.click(additionOption);

    const inputField1 = await screen.findByTestId("input-field-1");
    await user.type(inputField1, "2");

    const inputField2 = await screen.findByTestId("input-field-2");
    await user.type(inputField2, "3");

    const button = screen.getByText("Perform Operation");
    await user.click(button);

    await waitFor(() => {
      expect(mockPerformOperation).toHaveBeenCalledWith("addition", {
        value1: 2,
        value2: 3,
      });
    });
    const resultText = await screen.findByText("Result: 5");
    expect(resultText).toBeInTheDocument();
  });

  it("does not show second input field when operation requires one input", async () => {
    render(<OperationsForm balance={10} />);
    const user = userEvent.setup();

    const selectButton = screen.getByRole("combobox");
    await user.click(selectButton);

    const sqrtOption = await screen.findByText(/SQUARE_ROOT \(Cost: 1\)/i);
    await user.click(sqrtOption);

    const inputField1 = await screen.findByTestId("input-field-1");
    expect(inputField1).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("input-field-2")).not.toBeInTheDocument();
    });
  });
});
