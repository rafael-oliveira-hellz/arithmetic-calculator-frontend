import { render, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from ".";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Sidebar component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: "/",
    });
  });

  it("renders the sidebar with the correct initial width and aria-expanded attribute", () => {
    const { getByRole } = render(<Sidebar />);
    const sidebar = getByRole("navigation", { name: "Sidebar" });
    const toggleButton = getByRole("button", { name: "Toggle Sidebar" });

    expect(sidebar).toHaveStyle({ width: "60px" });

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles the sidebar width and aria-expanded attribute when the toggle button is clicked", async () => {
    const { getByRole } = render(<Sidebar />);
    const toggleButton = getByRole("button", { name: "Toggle Sidebar" });

    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    });

    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("renders the correct icon in the toggle button based on the isExpanded state", () => {
    const { getByRole, container } = render(<Sidebar />);
    const toggleButton = getByRole("button", { name: "Toggle Sidebar" });
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-icon",
      "MdOutlineMenu"
    );
    fireEvent.click(toggleButton);
    expect(container.querySelector("svg")).toHaveAttribute(
      "data-icon",
      "MdMenuOpen"
    );
  });
});
