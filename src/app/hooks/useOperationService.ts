"use client";

import useSWR from "swr";
import useApi from "./useApi";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { updateBalance } from "../store/slices/auth-slice";
import { setOperations } from "../store/slices/operations-slice";
import { OperationsResponse } from "@/shared/interfaces/operations";
import { Record } from "@/shared/interfaces/records";
import { useRecordService } from "./useRecordService";
import { useToast } from "@chakra-ui/react";

export const useOperationService = () => {
  const api = useApi();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();
  const { revalidateRecords } = useRecordService();

  const fetchOperations = async (): Promise<OperationsResponse> => {
    try {
      return await api.get<OperationsResponse>("/operations");
    } catch (error) {
      throw error;
    }
  };

  const useOperations = () => {
    const { data, error, isValidating } = useSWR(
      "/operations",
      fetchOperations,
      {
        revalidateOnFocus: false,
        dedupingInterval: 5000,
      }
    );

    if (data) {
      dispatch(setOperations(data));
    }

    return {
      operations: data || [],
      error,
      isLoading: isValidating && !data,
    };
  };

  const performOperation = async (
    type: string,
    payload: { value1: number; value2?: number }
  ): Promise<Record> => {
    try {
      const operationResponse = await api.post<Record>(
        `/operations/${type}`,
        payload
      );

      dispatch(updateBalance(operationResponse.userBalance));

      toast({
        title: "Success",
        description: "Operation performed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      await revalidateRecords();

      return operationResponse;
    } catch (error) {
      toast({
        title: "Action failed",
        description: `Operation failed: ${
          error instanceof Error ? error.message : error
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      throw error;
    }
  };

  return {
    performOperation,
    useOperations,
  };
};
