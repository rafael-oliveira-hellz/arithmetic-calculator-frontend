import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import SidebarContent from ".";
import { menuItems } from "../../config/menu-items";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SidebarContent Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("renders all menu items correctly", () => {
    render(<SidebarContent isExpanded={true} />);

    menuItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("calls router.push with the correct path when a menu item is clicked", () => {
    render(<SidebarContent isExpanded={true} />);

    const menuItem = menuItems[0];
    const menuElement = screen.getByText(menuItem.label);

    fireEvent.click(menuElement);

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(menuItem.path);
  });
});
