import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormHeader from ".";

describe("FormHeader Component", () => {
  it("renders the title text", () => {
    render(<FormHeader title="Test Title" />);

    const headingElement = screen.getByText("Test Title");
    expect(headingElement).toBeInTheDocument();
  });

  it("applies additional classes from className prop", () => {
    render(<FormHeader title="Test Title" className="custom-class" />);

    const headingElement = screen.getByText("Test Title");
    expect(headingElement).toHaveClass("custom-class");
  });

  it("renders with the correct default styles", () => {
    render(<FormHeader title="Test Title" />);

    const headingElement = screen.getByText("Test Title");
    expect(headingElement).toHaveStyle("text-align: center");
    expect(headingElement).toHaveStyle("font-size: 1.5em");
  });
});
