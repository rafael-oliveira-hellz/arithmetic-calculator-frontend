import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from ".";

describe("Dropdown Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const mockOnChange = jest.fn();

  it("renders the dropdown with options", () => {
    render(
      <Dropdown
        options={options}
        value=""
        placeholder="Select an option"
        onChange={mockOnChange}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls onChange with the correct value when an option is selected", () => {
    render(
      <Dropdown
        options={options}
        value=""
        placeholder="Select an option"
        onChange={mockOnChange}
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "option2" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("option2");
  });

  it("renders the correct value when a value is passed", () => {
    render(
      <Dropdown
        options={options}
        value="option3"
        placeholder="Select an option"
        onChange={mockOnChange}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("option3");
  });
});
