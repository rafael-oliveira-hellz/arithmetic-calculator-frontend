import React from "react";
import { render, screen } from "@testing-library/react";
import AuthGuard from "@/app/components/guards/auth-guard";
import RecordsPage from "./page";

jest.mock("@/app/components/guards/auth-guard", () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock("@/app/components/organisms/RecordsTable", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="records-table">RecordsTable</div>),
}));

describe("RecordsPage", () => {
  it("renders the RecordsPage correctly", () => {
    render(<RecordsPage />);

    expect(AuthGuard).toHaveBeenCalled();

    expect(screen.getByTestId("records-table")).toBeInTheDocument();
  });
});
