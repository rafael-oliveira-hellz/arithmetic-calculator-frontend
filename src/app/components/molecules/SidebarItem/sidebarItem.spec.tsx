import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SidebarItem from ".";
import { FaHome } from "react-icons/fa";

describe("SidebarItem Component", () => {
  const mockOnClick = jest.fn();

  it("renders the icon and label when expanded", () => {
    render(
      <SidebarItem
        icon={FaHome}
        label="Home"
        isExpanded={true}
        onClick={mockOnClick}
      />
    );

    const iconElement = screen.getByRole("img", { name: "Home" });
    expect(iconElement).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders only the icon when not expanded", () => {
    render(
      <SidebarItem
        icon={FaHome}
        label="Home"
        isExpanded={false}
        onClick={mockOnClick}
      />
    );

    const iconElement = screen.getByRole("img", { name: "Home" });
    expect(iconElement).toBeInTheDocument();

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(
      <SidebarItem
        icon={FaHome}
        label="Home"
        isExpanded={true}
        onClick={mockOnClick}
      />
    );

    const sidebarItem = screen.getByText("Home");
    fireEvent.click(sidebarItem);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
