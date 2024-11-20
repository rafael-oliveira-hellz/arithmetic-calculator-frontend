"use client";

// import { useToast } from "../hooks/useToast";
import { useDispatch } from "react-redux";
import useApi from "./useApi";
import {
  login,
  logout,
  removeRecord,
  updateBalance,
  updateRecords,
} from "../store/slices/auth-slice";
import { AppDispatch } from "../store/store";
import { IUser } from "@/shared/types/user";
import { Record, RecordsResponse } from "@/shared/interfaces/records";
import { useRouter } from "next/navigation";
import { useToast } from "./useToast";
import { OperationsResponse } from "@/shared/interfaces/operations";

export const useAuthService = () => {
  const api = useApi();
  const router = useRouter();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();

  const loginUser = async (
    username: string,
    password: string
  ): Promise<void> => {
    const response = await api.post<IUser>("/login", {
      username,
      password,
    });

    console.log(JSON.stringify(response, null, 2));

    if (!response.active) {
      toast.showToast({
        title: "Erro",
        description: "Usuário bão existe. Acesso negado.",
        status: "error",
      });
      throw new Error("Access denied. User does not exist.");
    }

    dispatch(login({ user: response, accessToken: response.accessToken }));

    sessionStorage.setItem("accessToken", response.accessToken);
  };

  const logoutUser = async (): Promise<void> => {
    try {
      // await api.post<void>("/logout", {});

      dispatch(logout());

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.showToast({
          title: "Erro",
          description: error.message || "Erro ao realizar logout",
          status: "error",
        });
        console.log(JSON.stringify(error, null, 2));
      }
      throw error;
    }
  };

  const performOperation = async (
    type: string,
    payload: { value1: number; value2?: number }
  ): Promise<Record> => {
    try {
      // Realiza o POST para criar uma operação
      const operationResponse = await api.post<Record>(
        `/operations/${type}`,
        payload
      );

      // Atualiza o balance no estado global ... newBalance é generico, tipagem a ser definida
      dispatch(updateBalance(operationResponse.userBalance));

      // Busca os novos registros após a operação
      const records = await api.get<Record[]>("/records");

      // Atualiza os registros na tela com o dispatch
      dispatch(updateRecords(records)); // Adicione o updateRecords ao seu slice de Redux

      toast.showToast({
        title: "Sucesso",
        description: "Operação realizada com sucesso!",
        status: "success",
      });
      return operationResponse;
    } catch (error) {
      if (error instanceof Error) {
        toast.showToast({
          title: "Erro",
          description: error.message || "Erro ao realizar operação.",
          status: "error",
        });
        console.log(JSON.stringify(error, null, 2));
      }
      throw error;
    }
  };

  const getLatestUserBalance = (records: Record[], balance: number): number => {
    if (records.length === 0) return balance;

    const latestRecord = records.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });

    return latestRecord.userBalance;
  };

  const fetchRecords = async (balance: number): Promise<Record[]> => {
    try {
      const response = await api.get<RecordsResponse>("/records");

      const latestBalance = getLatestUserBalance(response.content, balance);

      dispatch(updateRecords(response.content));
      dispatch(updateBalance(latestBalance));

      return response.content;
    } catch (error) {
      toast.showToast({
        title: "Erro",
        description: "Falha ao buscar registros.",
        status: "error",
      });
      throw error;
    }
  };

  const fetchOperations = async (): Promise<OperationsResponse> => {
    try {
      return await api.get<OperationsResponse>("/operations");
    } catch (error) {
      toast.showToast({
        title: "Erro",
        description: "Falha ao buscar operações.",
        status: "error",
      });
      throw error;
    }
  };

  const deleteRecord = async (recordId: string): Promise<void> => {
    try {
      // Faz a requisição de deleção
      await api.delete(`/records/${recordId}`);

      // Remove o registro diretamente da pilha do Redux
      dispatch(removeRecord(recordId));

      toast.showToast({
        title: "Record Deleted",
        description: "The record has been successfully deleted.",
        status: "success",
      });
    } catch (error) {
      toast.showToast({
        title: "Record Deletion Failed",
        description: "An error occurred while deleting the record.",
        status: "error",
      });
      throw error;
    }
  };

  return {
    loginUser,
    logoutUser,
    updateBalance,
    performOperation,
    fetchRecords,
    deleteRecord,
    fetchOperations,
  };
};
