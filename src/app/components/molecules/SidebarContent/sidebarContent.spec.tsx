import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SidebarContent from ".";
import { menuItems } from "../../config/menu-items";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: mockPush,
      pathname: "/",
    };
  },
  usePathname() {
    return "/";
  },
}));

describe("SidebarContent Component", () => {
  beforeEach(() => {
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
