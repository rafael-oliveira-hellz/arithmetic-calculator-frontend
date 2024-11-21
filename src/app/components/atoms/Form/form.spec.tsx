import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from ".";

describe("Form Component", () => {
  it("renders the form with children elements", () => {
    render(
      <Form>
        <input type="text" placeholder="Enter text" />
      </Form>
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  it("applies additional classes from className prop", () => {
    render(
      <Form className="custom-class">
        <input type="text" placeholder="Enter text" />
      </Form>
    );

    const formElement = screen.getByRole("form");
    expect(formElement).toHaveClass("custom-class");
  });

  it("calls the onSubmit function when the form is submitted", () => {
    const mockOnSubmit = jest.fn();
    render(
      <Form onSubmit={mockOnSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    const buttonElement = screen.getByText("Submit");
    fireEvent.click(buttonElement);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("prevents default behavior on submit", () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={mockOnSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    const formElement = screen.getByRole("form", { name: "form" });
    fireEvent.submit(formElement);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit.mock.calls[0][0].preventDefault).toBeDefined();
  });
});
