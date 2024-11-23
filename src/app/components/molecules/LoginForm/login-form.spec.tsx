import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from ".";

describe("LoginForm Component", () => {
  const mockOnUsernameChange = jest.fn();
  const mockOnPasswordChange = jest.fn();
  const mockOnSubmit = jest.fn();

  const setup = (isLoading = false) =>
    render(
      <LoginForm
        username=""
        password=""
        onUsernameChange={mockOnUsernameChange}
        onPasswordChange={mockOnPasswordChange}
        onSubmit={mockOnSubmit}
        isLoading={isLoading}
      />
    );

  it("renders the username and password input fields", () => {
    setup();

    const usernameInput = screen.getByPlaceholderText("Type your username");
    const passwordInput = screen.getByPlaceholderText("Type your password");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("triggers the onUsernameChange handler when typing in the username field", () => {
    setup();

    const usernameInput = screen.getByPlaceholderText("Type your username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    expect(mockOnUsernameChange).toHaveBeenCalledWith({
      target: { value: "testuser" },
    });
  });

  it("triggers the onPasswordChange handler when typing in the password field", () => {
    setup();

    const passwordInput = screen.getByPlaceholderText("Type your password");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect(mockOnPasswordChange).toHaveBeenCalledWith({
      target: { value: "testpassword" },
    });
  });

  it("disables the login button if the form is invalid", () => {
    setup();

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it("enables the login button if the form is valid", () => {
    render(
      <LoginForm
        username="testuser"
        password="testpassword"
        onUsernameChange={mockOnUsernameChange}
        onPasswordChange={mockOnPasswordChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeEnabled();
  });

  it("shows the loading spinner when isLoading is true", () => {
    setup(true);

    const spinner = screen.getByTestId("button-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("calls onSubmit when the form is submitted", () => {
    render(
      <LoginForm
        username="testuser"
        password="testpassword"
        onUsernameChange={mockOnUsernameChange}
        onPasswordChange={mockOnPasswordChange}
        onSubmit={mockOnSubmit}
        isLoading={false}
      />
    );

    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
