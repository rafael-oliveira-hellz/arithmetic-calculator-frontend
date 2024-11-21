import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from ".";

describe("Spinner Component", () => {
  it("renders the spinner icon", () => {
    render(<Spinner />);
    const spinnerIcon = screen.getByTestId("spinner-icon");
    expect(spinnerIcon).toBeInTheDocument();
  });

  it("renders with custom width and height for spinner", () => {
    render(<Spinner width="50px" height="50px" />);
    const spinnerIcon = screen.getByTestId("spinner-icon");
    expect(spinnerIcon).toHaveStyle({ width: "50px", height: "50px" });
  });

  it("renders loading text when provided", () => {
    render(<Spinner loadingText="Loading..." />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });

  it("applies custom className to the container", () => {
    const customClass = "custom-spinner";
    render(<Spinner className={customClass} />);
    const spinnerContainer = screen.getByTestId("spinner");
    expect(spinnerContainer).toHaveClass(customClass);
  });

  it("uses a custom data-testid", () => {
    render(<Spinner dataTestId="custom-spinner" />);
    const customSpinner = screen.getByTestId("custom-spinner");
    expect(customSpinner).toBeInTheDocument();
  });
});
