import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormInputField from ".";
import { InputFieldConfig } from "@/shared/interfaces/input-field";
import { IconType } from "@/shared/types/icons";

describe("FormInputField Component", () => {
  const mockOnChange = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  const fieldConfig: InputFieldConfig = {
    id: "test-input",
    value: "",
    onChange: mockOnChange,
    placeholder: "Enter value",
    isValid: true,
    errorMessage: "Invalid input",
    iconType: "name" as IconType,
    onFocus: mockOnFocus,
    onBlur: mockOnBlur,
    showRules: false,
    rulesComponent: null,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field with correct placeholder", () => {
    render(<FormInputField field={fieldConfig} />);
    const inputElement = screen.getByPlaceholderText("Enter value");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onChange handler when the value changes", () => {
    render(<FormInputField field={fieldConfig} />);
    const inputElement = screen.getByPlaceholderText("Enter value");

    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: "New Value" },
      })
    );
  });

  it("renders error message when isValid is false", () => {
    render(
      <FormInputField
        field={{
          ...fieldConfig,
          isValid: false,
          errorMessage: "Invalid input",
        }}
      />
    );
    expect(screen.getByText("Invalid input")).toBeInTheDocument();
  });

  it("calls onFocus when the input gains focus", () => {
    render(<FormInputField field={fieldConfig} />);
    const inputElement = screen.getByPlaceholderText("Enter value");

    fireEvent.focus(inputElement);
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it("calls onBlur when the input loses focus", () => {
    render(<FormInputField field={fieldConfig} />);
    const inputElement = screen.getByPlaceholderText("Enter value");

    fireEvent.blur(inputElement);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it("renders the rules component if showRules is true", () => {
    const mockRulesComponent = <div data-testid="rules-component">Rules</div>;

    render(
      <FormInputField
        field={{
          ...fieldConfig,
          showRules: true,
          rulesComponent: mockRulesComponent,
        }}
      />
    );

    const rulesComponent = screen.getByTestId("rules-component");
    expect(rulesComponent).toBeInTheDocument();
    expect(rulesComponent).toHaveTextContent("Rules");
  });
});
