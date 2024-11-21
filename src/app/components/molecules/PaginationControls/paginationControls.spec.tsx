import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from ".";

describe("PaginationControls Component", () => {
  const mockOnPrevious = jest.fn();
  const mockOnNext = jest.fn();

  const setup = (props = {}) =>
    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        isFirst={false}
        isLast={false}
        {...props}
      />
    );

  it("renders the correct current page and total pages", () => {
    setup();
    const textElement = screen.getByText(/Page 2 of 5/i);
    expect(textElement).toBeInTheDocument();
  });

  it("disables the 'Previous Page' button when on the first page", () => {
    setup({ isFirst: true });
    const prevButton = screen.getByText(/Previous Page/i);
    expect(prevButton).toBeDisabled();
  });

  it("disables the 'Next Page' button when on the last page", () => {
    setup({ isLast: true });
    const nextButton = screen.getByText(/Next Page/i);
    expect(nextButton).toBeDisabled();
  });

  it("calls onPrevious when 'Previous Page' button is clicked", () => {
    setup();
    const prevButton = screen.getByText(/Previous Page/i);
    fireEvent.click(prevButton);
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when 'Next Page' button is clicked", () => {
    setup();
    const nextButton = screen.getByText(/Next Page/i);
    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });
});
