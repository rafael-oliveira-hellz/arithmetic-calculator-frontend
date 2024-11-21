import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filters from ".";

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: jest.fn(),
  });
});

describe("Filters Component", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the menu button with the correct label", () => {
    render(
      <Filters
        filters={{ type: "", amount: "" }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const menuButton = screen.getByRole("button", {
      name: "Filter by operation type",
    });
    expect(menuButton).toBeInTheDocument();
  });

  it("renders the filter input with the correct placeholder", () => {
    render(
      <Filters
        filters={{ type: "", amount: "" }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      "Filter By Operation Cost"
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onFilterChange when a menu option is clicked", () => {
    render(
      <Filters
        filters={{ type: "", amount: "" }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const menuButton = screen.getByRole("button", {
      name: "Filter by operation type",
    });
    fireEvent.click(menuButton);

    const menuItem = screen.getByText(/ADDITION \(Cost: 5\)/i);
    fireEvent.click(menuItem);

    expect(mockOnFilterChange).toHaveBeenCalledWith("type", "ADDITION");
  });

  it("calls onFilterChange when SHOW ALL is clicked", () => {
    render(
      <Filters
        filters={{ type: "ADDITION", amount: "" }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const menuButton = screen.getByRole("button", {
      name: "Filter by operation type",
    });
    fireEvent.click(menuButton);

    const showAllItem = screen.getByText(/SHOW ALL/i);
    fireEvent.click(showAllItem);

    expect(mockOnFilterChange).toHaveBeenCalledWith("type", "");
  });

  it("calls onFilterChange when the input value changes", () => {
    render(
      <Filters
        filters={{ type: "", amount: "" }}
        onFilterChange={mockOnFilterChange}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      "Filter By Operation Cost"
    );
    fireEvent.change(inputElement, { target: { value: "10" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("amount", "10");
  });
});
