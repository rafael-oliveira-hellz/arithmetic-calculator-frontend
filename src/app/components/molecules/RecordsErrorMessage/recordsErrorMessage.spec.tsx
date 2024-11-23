import React from "react";
import { render, screen } from "@testing-library/react";
import RecordsErrorMessage from ".";

describe("RecordsErrorMessage component", () => {
  it("renders with the correct error message", () => {
    const errorMessage = "Something went wrong";
    render(<RecordsErrorMessage message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders with the correct error title", () => {
    render(<RecordsErrorMessage message="Something went wrong" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders with a custom error message", () => {
    const errorMessage = "Custom error message";
    render(<RecordsErrorMessage message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
