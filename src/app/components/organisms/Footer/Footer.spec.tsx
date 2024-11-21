import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Footer from ".";

describe("Footer", () => {
  it("should render the footer with default text", () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();

    expect(
      getByText(`© ${currentYear} Arithmetic Calculator. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("should apply the provided className to the footer", () => {
    const { container } = render(<Footer className="custom-class" />);
    const footer = container.querySelector("footer");

    expect(footer).toHaveClass("custom-class");
  });

  it("should have the default Chakra UI Flex properties", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");

    expect(footer).toHaveStyle({
      justifyContent: "center",
    });
  });

  it("should render a Text component inside the footer", () => {
    const { container } = render(<Footer />);
    const text = container.querySelector("p");

    expect(text).not.toBeNull();
    expect(text?.textContent).toContain("Arithmetic Calculator");
  });

  it("should include ARIA attributes for accessibility", () => {
    const { getByRole, getByLabelText } = render(<Footer />);

    const footer = getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("aria-label", "Footer");

    const copyrightText = getByLabelText("Copyright");
    expect(copyrightText).toBeInTheDocument();
  });

  it("should not violate accessibility standards", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
