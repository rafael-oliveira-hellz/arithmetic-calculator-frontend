import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorMessage from ".";

describe("ErrorMessage Component", () => {
  it("renders the error message with the provided text", () => {
    render(<ErrorMessage>Something went wrong</ErrorMessage>);

    const errorMessageElement = screen.getByText("Something went wrong");
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("applies additional classes from className prop", () => {
    render(
      <ErrorMessage className="custom-class">Something went wrong</ErrorMessage>
    );

    const errorMessageElement = screen.getByText("Something went wrong");
    expect(errorMessageElement).toHaveClass("custom-class");
  });

  it("supports additional HTML attributes", () => {
    render(
      <ErrorMessage data-testid="error-message" role="alert">
        Something went wrong
      </ErrorMessage>
    );

    const errorMessageElement = screen.getByTestId("error-message");
    expect(errorMessageElement).toHaveAttribute("role", "alert");
  });
});
