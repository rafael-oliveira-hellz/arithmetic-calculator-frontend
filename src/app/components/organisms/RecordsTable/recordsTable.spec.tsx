import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecordsTable from ".";
import { useRecordService } from "@/app/hooks/useRecordService";

jest.mock("@/app/hooks/useRecordService");

const mockDeleteRecord = jest.fn();
const mockRevalidateRecords = jest.fn();
const mockUseRecords = jest.fn();

(useRecordService as jest.Mock).mockImplementation(() => ({
  useRecords: mockUseRecords,
  deleteRecord: mockDeleteRecord,
  revalidateRecords: mockRevalidateRecords,
}));

describe("RecordsTable Component", () => {
  const mockRecords = [
    {
      id: "1",
      operation: { type: "ADDITION" },
      date: "2023-11-20",
      amount: 50,
      deleted: false,
    },
    {
      id: "2",
      operation: { type: "SUBTRACTION" },
      date: "2023-11-19",
      amount: 30,
      deleted: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRecords.mockReturnValue({
      records: mockRecords,
      totalPages: 1,
      isLoading: false,
      error: null,
    });
  });

  it("applies filters correctly", () => {
    render(<RecordsTable />);

    const filterInput = screen.getByPlaceholderText("Filter By Operation Cost");
    fireEvent.change(filterInput, { target: { value: "50" } });

    expect(screen.getByText("ADDITION")).toBeInTheDocument();
    expect(screen.queryByText("SUBTRACTION")).not.toBeInTheDocument();
  });

  it("deletes a record and revalidates the data", async () => {
    render(<RecordsTable />);

    const deleteButton = screen.getAllByLabelText("Delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteRecord).toHaveBeenCalledWith("1"));
    expect(mockRevalidateRecords).toHaveBeenCalled();
  });

  it("renders loading spinner when loading", () => {
    mockUseRecords.mockReturnValue({
      records: [],
      totalPages: 0,
      isLoading: true,
      error: null,
    });

    render(<RecordsTable />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders error message when there is an error", () => {
    mockUseRecords.mockReturnValue({
      records: [],
      totalPages: 0,
      isLoading: false,
      error: "Failed to load records",
    });

    render(<RecordsTable />);

    expect(screen.getByText("Error loading records.")).toBeInTheDocument();
  });

  it("renders records and table headers", () => {
    render(<RecordsTable />);

    expect(screen.getByText("Operation Records")).toBeInTheDocument();
    expect(screen.getByText("ADDITION")).toBeInTheDocument();
    expect(screen.getByText("SUBTRACTION")).toBeInTheDocument();
  });
});
