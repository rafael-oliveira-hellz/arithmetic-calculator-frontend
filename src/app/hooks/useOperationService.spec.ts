import { renderHook, act } from "@testing-library/react-hooks";
import useSWR from "swr";
import useApi from "./useApi";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useOperationService } from "./useOperationService";
import { updateBalance } from "../store/slices/auth-slice";
import { setOperations } from "../store/slices/operations-slice";
import { useRecordService } from "./useRecordService";
import { OperationType } from "@/shared/interfaces/operations";

jest.mock("./useApi");
jest.mock("swr");
jest.mock("@chakra-ui/react", () => ({
  useToast: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
jest.mock("../store/slices/auth-slice", () => ({
  updateBalance: jest.fn(),
}));
jest.mock("../store/slices/operations-slice", () => ({
  setOperations: jest.fn(),
}));
jest.mock("./useRecordService", () => ({
  useRecordService: jest.fn(() => ({
    revalidateRecords: jest.fn(),
  })),
}));

describe("useOperationService", () => {
  const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
  };
  const mockDispatch = jest.fn();
  const mockToast = jest.fn();
  const mockRevalidateRecords = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useApi as jest.Mock).mockReturnValue(mockApi);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (useRecordService as jest.Mock).mockReturnValue({
      revalidateRecords: mockRevalidateRecords,
    });
  });

  describe("useOperations", () => {
    it("should fetch operations and dispatch them to the store", async () => {
      const mockOperationsResponse = [
        { id: "1", type: "ADDITION" as OperationType, cost: 5 },
        { id: "2", type: "SUBTRACTION" as OperationType, cost: 3 },
      ];

      (useSWR as jest.Mock).mockReturnValue({
        data: mockOperationsResponse,
        error: null,
        isValidating: false,
      });

      const { result } = renderHook(() =>
        useOperationService().useOperations()
      );

      expect(result.current.operations).toEqual(mockOperationsResponse);
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);

      expect(mockDispatch).toHaveBeenCalledWith(
        setOperations(mockOperationsResponse)
      );
    });

    it("should return loading state if data is being fetched", () => {
      (useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: null,
        isValidating: true,
      });

      const { result } = renderHook(() =>
        useOperationService().useOperations()
      );

      expect(result.current.operations).toEqual([]);
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(true);
    });

    it("should return an error if the request fails", () => {
      const mockError = new Error("Failed to fetch operations");

      (useSWR as jest.Mock).mockReturnValue({
        data: null,
        error: mockError,
        isValidating: false,
      });

      const { result } = renderHook(() =>
        useOperationService().useOperations()
      );

      expect(result.current.operations).toEqual([]);
      expect(result.current.error).toBe(mockError);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("performOperation", () => {
    it("should perform the operation and dispatch the new balance", async () => {
      const mockOperationResponse = {
        id: "rec1",
        userBalance: 100,
        operationResponse: "10 + 20 = 30",
      };

      mockApi.post.mockResolvedValue(mockOperationResponse);

      const { result } = renderHook(() => useOperationService());

      await act(async () => {
        const response = await result.current.performOperation("ADDITION", {
          value1: 10,
          value2: 20,
        });

        expect(response).toEqual(mockOperationResponse);
      });

      expect(mockApi.post).toHaveBeenCalledWith("/operations/ADDITION", {
        value1: 10,
        value2: 20,
      });

      expect(mockDispatch).toHaveBeenCalledWith(updateBalance(100));
      expect(mockToast).toHaveBeenCalledWith({
        title: "Success",
        description: "Operation performed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      expect(mockRevalidateRecords).toHaveBeenCalled();
    });

    it("should handle errors and show a toast if the operation fails", async () => {
      const mockError = new Error("Operation failed");

      mockApi.post.mockRejectedValue(mockError);

      const { result } = renderHook(() => useOperationService());

      await expect(
        act(async () => {
          await result.current.performOperation("SUBTRACTION", {
            value1: 10,
            value2: 5,
          });
        })
      ).rejects.toThrow("Operation failed");

      expect(mockApi.post).toHaveBeenCalledWith("/operations/SUBTRACTION", {
        value1: 10,
        value2: 5,
      });

      expect(mockToast).toHaveBeenCalledWith({
        title: "Action failed",
        description: "Operation failed: Operation failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });
  });
});
