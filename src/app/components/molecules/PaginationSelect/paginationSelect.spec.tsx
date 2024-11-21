import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationSelect from ".";

describe("PaginationSelect Component", () => {
  const mockOnItemsPerPageChange = jest.fn();

  const setup = (props = {}) =>
    render(
      <PaginationSelect
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
        {...props}
      />
    );

  it("renders with the correct default value", () => {
    setup();
    const selectElement = screen.getByRole("combobox", {
      name: /items per page/i,
    });
    expect(selectElement).toHaveValue("10");
  });

  it("displays all available options (excluding placeholder)", () => {
    setup();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options.map((option) => option.textContent)).toEqual([
      "Select items per page",
      "5",
      "10",
      "20",
    ]);
  });

  it("calls onItemsPerPageChange when a new option is selected", () => {
    setup();
    const selectElement = screen.getByRole("combobox", {
      name: /items per page/i,
    });
    fireEvent.change(selectElement, { target: { value: "20" } });
    expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(20);
  });

  it("renders the placeholder as the first option when no value is selected", () => {
    setup({ itemsPerPage: "" });
    const selectElement = screen.getByRole("combobox", {
      name: /items per page/i,
    });
    const placeholderOption = screen.getByText("Select items per page");
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveAttribute("value", "");
    expect(selectElement).toHaveValue("");
  });
});
