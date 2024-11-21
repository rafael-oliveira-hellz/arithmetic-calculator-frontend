import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Table } from "@chakra-ui/react";
import RecordTableHeader from ".";

describe("RecordTableHeader Component", () => {
  const renderWithTable = (component: React.ReactNode) => {
    return render(<Table>{component}</Table>);
  };

  it("renders all column headers correctly", () => {
    renderWithTable(
      <RecordTableHeader sortOrder="asc" onSortChange={() => {}} />
    );

    expect(screen.getByText("TYPE")).toBeInTheDocument();
    expect(screen.getByText("OPERATION COST")).toBeInTheDocument();
    expect(screen.getByText("USER BALANCE")).toBeInTheDocument();
    expect(screen.getByText("OPERATION RESPONSE")).toBeInTheDocument();
    expect(screen.getByText("DATE")).toBeInTheDocument();
    expect(screen.getByText("ACTIONS")).toBeInTheDocument();
  });

  it("renders sort icon based on the sort order", () => {
    const { rerender } = renderWithTable(
      <RecordTableHeader sortOrder="asc" onSortChange={() => {}} />
    );

    const sortButton = screen.getByLabelText("Sort operation by date");
    expect(sortButton).toContainElement(screen.getByTestId("arrow-up-icon"));

    rerender(
      <Table>
        <RecordTableHeader sortOrder="desc" onSortChange={() => {}} />
      </Table>
    );

    expect(sortButton).toContainElement(screen.getByTestId("arrow-down-icon"));
  });

  it("calls onSortChange when sort button is clicked", () => {
    const onSortChangeMock = jest.fn();

    renderWithTable(
      <RecordTableHeader sortOrder="asc" onSortChange={onSortChangeMock} />
    );

    const sortButton = screen.getByLabelText("Sort operation by date");
    fireEvent.click(sortButton);

    expect(onSortChangeMock).toHaveBeenCalledTimes(1);
  });
});
