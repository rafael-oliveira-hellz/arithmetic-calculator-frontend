import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormLayout from ".";

describe("FormLayout Component", () => {
  it("renders the layout with the correct title", () => {
    render(
      <FormLayout title="Test Form">
        <div>Child Content</div>
      </FormLayout>
    );

    const titleElement = screen.getByText("Test Form");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(
      "text-gray-800 text-2xl font-bold text-center"
    );
  });

  it("renders children inside the layout", () => {
    render(
      <FormLayout title="Test Form">
        <div data-testid="child-content">Child Content</div>
      </FormLayout>
    );

    const childContent = screen.getByTestId("child-content");
    expect(childContent).toBeInTheDocument();
    expect(childContent).toHaveTextContent("Child Content");
  });

  it("applies the additional className passed as a prop", () => {
    render(
      <FormLayout title="Test Form" className="custom-class">
        <div>Child Content</div>
      </FormLayout>
    );

    const layoutContainer = screen.getByTestId("layout-container");
    expect(layoutContainer).toHaveClass("custom-class");
  });
});
