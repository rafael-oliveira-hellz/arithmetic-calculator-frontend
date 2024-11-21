import { render, screen, fireEvent } from "@testing-library/react";
import InputField from ".";

describe("InputField Component", () => {
  const mockOnChange = jest.fn();

  it("renders the input field with correct placeholder", () => {
    render(
      <InputField
        id="test-id"
        value=""
        placeholder="Type here"
        onChange={mockOnChange}
        iconType="name"
      />
    );

    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it('renders the appropriate icon for iconType "email"', () => {
    render(
      <InputField
        id="email-icon"
        value=""
        placeholder="Enter email"
        onChange={mockOnChange}
        iconType="email"
      />
    );

    const emailIcon = screen.getByTestId("chakra-email-icon");
    expect(emailIcon).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(
      <InputField
        id="password-test"
        value=""
        placeholder="Enter password"
        onChange={mockOnChange}
        iconType="password"
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter password");
    const toggleButton = screen.getByTestId("toggle-password-visibility");

    expect(inputElement).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
