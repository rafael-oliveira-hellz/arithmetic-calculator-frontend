import { renderHook, act } from "@testing-library/react-hooks";
import useSWR, { mutate } from "swr";
import useApi from "./useApi";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useRecordService } from "./useRecordService";
import { removeRecord } from "../store/slices/record-slice";

jest.mock("./useApi");
jest.mock("swr");
jest.mock("@chakra-ui/react", () => ({
  useToast: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
jest.mock("../store/slices/record-slice", () => ({
  removeRecord: jest.fn(),
}));

describe("useRecordService", () => {
  const mockApi = {
    get: jest.fn(),
    delete: jest.fn(),
  };
  const mockDispatch = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useApi as jest.Mock).mockReturnValue(mockApi);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  describe("useRecords", () => {
    it("should fetch records and return them", async () => {
      const mockRecordsResponse = {
        content: [
          { id: "1", name: "Record 1" },
          { id: "2", name: "Record 2" },
        ],
        totalPages: 5,
        first: true,
        last: false,
      };

      (useSWR as jest.Mock).mockReturnValue({
        data: mockRecordsResponse,
        error: null,
        isValidating: false,
      });

      const { result } = renderHook(() => useRecordService().useRecords(1, 10));

      expect(result.current.records).toEqual(mockRecordsResponse.content);
      expect(result.current.totalPages).toBe(5);
      expect(result.current.isFirst).toBe(true);
      expect(result.current.isLast).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should return loading state while fetching records", () => {
      (useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: null,
        isValidating: true,
      });

      const { result } = renderHook(() => useRecordService().useRecords(1, 10));

      expect(result.current.records).toEqual([]);
      expect(result.current.isLoading).toBe(true);
    });

    it("should return an error if fetching records fails", () => {
      const mockError = new Error("Failed to fetch records");

      (useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: mockError,
        isValidating: false,
      });

      const { result } = renderHook(() => useRecordService().useRecords(1, 10));

      expect(result.current.records).toEqual([]);
      expect(result.current.error).toBe(mockError);
    });
  });

  describe("deleteRecord", () => {
    it("should delete a record and dispatch the removal", async () => {
      mockApi.delete.mockResolvedValue({});

      const { result } = renderHook(() => useRecordService());

      await act(async () => {
        await result.current.deleteRecord("1");
      });

      expect(mockApi.delete).toHaveBeenCalledWith("/records/1");
      expect(mockDispatch).toHaveBeenCalledWith(removeRecord("1"));
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success",
        description: "Record deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });

    it("should handle errors when deleting a record fails", async () => {
      const mockError = new Error("Deletion failed");

      mockApi.delete.mockRejectedValue(mockError);

      const { result } = renderHook(() => useRecordService());

      await expect(
        act(async () => {
          await result.current.deleteRecord("1");
        })
      ).rejects.toThrow("Deletion failed");

      expect(mockApi.delete).toHaveBeenCalledWith("/records/1");
      expect(mockToast).toHaveBeenCalledWith({
        title: "Action failed",
        description: "Record deletion failed: Deletion failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  });

  describe("revalidateRecords", () => {
    it("should trigger revalidation of records", async () => {
      (mutate as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useRecordService());

      await act(async () => {
        await result.current.revalidateRecords();
      });

      expect(mutate).toHaveBeenCalledWith("/records");
    });
  });
});
