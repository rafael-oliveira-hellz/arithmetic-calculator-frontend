"use client";

import { useDispatch } from "react-redux";
import useApi from "./useApi";
import { useToast } from "./useToast";
import { updateBalance } from "../store/slices/auth-slice";
import { AppDispatch } from "../store/store";
import { Record } from "@/shared/interfaces/records";
import { OperationsResponse } from "@/shared/interfaces/operations";
import { setOperations } from "../store/slices/operations-slice";

export const useOperationService = () => {
  const api = useApi();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();

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

  const fetchOperations = async (): Promise<OperationsResponse> => {
    try {
      const response = await api.get<OperationsResponse>("/operations");

      dispatch(setOperations(response));

      return response;
    } catch (error) {
      toast.showToast({
        title: "Erro",
        description: "Falha ao buscar operações.",
        status: "error",
      });
      throw error;
    }
  };

  return {
    performOperation,
    fetchOperations,
  };
};
