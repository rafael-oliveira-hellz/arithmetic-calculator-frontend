import React from "react";
import { render, screen } from "@testing-library/react";
import Button from ".";

describe("Button Component", () => {
  it("displays a spinner when isLoading is true", () => {
    render(<Button isLoading>Click Me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("disables the button when both isLoading and isDisabled are true", () => {
    render(
      <Button isLoading isDisabled>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders children when not loading", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });
});
