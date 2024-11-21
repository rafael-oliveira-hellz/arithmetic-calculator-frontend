import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Table, Tbody } from "@chakra-ui/react";
import RecordTableRow from ".";
import { Record } from "@/shared/interfaces/records";

const mockRecord: Record = {
  id: "1",
  operation: {
    id: "op-1",
    type: "ADDITION",
    cost: 10,
  },
  user: "user-1",
  amount: 50,
  userBalance: 100,
  operationResponse: "Success",
  date: "2023-11-20T12:00:00Z",
  deleted: false,
};

describe("RecordTableRow Component", () => {
  const renderWithTable = (component: React.ReactNode) => {
    return render(
      <Table>
        <Tbody>{component}</Tbody>
      </Table>
    );
  };

  it("renders record data correctly", () => {
    renderWithTable(<RecordTableRow record={mockRecord} onDelete={() => {}} />);

    expect(screen.getByText("ADDITION")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(
      screen.getByText(new Date(mockRecord.date).toLocaleString())
    ).toBeInTheDocument();
  });

  it("calls onDelete with the correct record ID when delete button is clicked", () => {
    const onDeleteMock = jest.fn();

    renderWithTable(
      <RecordTableRow record={mockRecord} onDelete={onDeleteMock} />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(mockRecord.id);
  });

  it("calls onDelete with the correct record ID when delete button is clicked", () => {
    const onDeleteMock = jest.fn();

    renderWithTable(
      <RecordTableRow record={mockRecord} onDelete={onDeleteMock} />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(mockRecord.id);
  });
});
