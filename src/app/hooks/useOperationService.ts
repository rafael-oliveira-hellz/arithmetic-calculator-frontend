"use client";

import { useToast } from "./useToast";
import useSWR from "swr";
import useApi from "./useApi";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { updateBalance } from "../store/slices/auth-slice";
import { setOperations } from "../store/slices/operations-slice";
import { OperationsResponse } from "@/shared/interfaces/operations";
import { Record } from "@/shared/interfaces/records";
import { useRecordService } from "./useRecordService";

export const useOperationService = () => {
  const api = useApi();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();
  const { revalidateRecords } = useRecordService();

  const fetchOperations = async (): Promise<OperationsResponse> => {
    try {
      return await api.get<OperationsResponse>("/operations");
    } catch (error) {
      console.error("Erro ao buscar operações:", error);
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

      toast.showToast({
        title: "Sucesso",
        description: "Operação realizada com sucesso!",
        status: "success",
      });

      await revalidateRecords();

      return operationResponse;
    } catch (error) {
      toast.showToast({
        title: "Erro",
        description: "Erro ao realizar operação.",
        status: "error",
      });
      throw error;
    }
  };

  return {
    performOperation,
    useOperations,
  };
};
