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
import { Record } from "../components/organisms/Dashboard";

export const useAuthService = () => {
  const api = useApi();
  // const toast = useToast();
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
      // toast.showToast({
      //   title: "Erro",
      //   description: "Usuário bão existe. Acesso negado.",
      //   status: "error",
      // });
      throw new Error("Usuário bão existe. Acesso negado.");
    }

    dispatch(login({ user: response, accessToken: response.accessToken }));

    sessionStorage.setItem("accessToken", response.accessToken);
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await api.post<void>("/logout", {});

      dispatch(logout());

      sessionStorage.removeItem("accessToken");
    } catch (error) {
      if (error instanceof Error) {
        // toast.showToast({
        //   title: "Erro",
        //   description: error.message || "Erro ao realizar logout",
        //   status: "error",
        // });
        console.log(JSON.stringify(error, null, 2));
      }
      throw error;
    }
  };

  const performOperation = async (
    type: string,
    payload: unknown
  ): Promise<void> => {
    try {
      // Realiza o POST para criar uma operação
      const operationResponse = await api.post<{ newBalance: number }>(
        "/operations/" + type,
        payload
      );

      // Atualiza o balance no estado global ... newBalance é generico, tipagem a ser definida
      dispatch(updateBalance(operationResponse.newBalance));

      // Busca os novos registros após a operação
      const records = await api.get<Record[]>("/records");

      // Atualiza os registros na tela com o dispatch
      dispatch(updateRecords(records)); // Adicione o updateRecords ao seu slice de Redux

      // toast.showToast({
      //   title: "Sucesso",
      //   description: "Operação realizada com sucesso!",
      //   status: "success",
      // });
    } catch (error) {
      if (error instanceof Error) {
        // toast.showToast({
        //   title: "Erro",
        //   description: error.message || "Erro ao realizar operação.",
        //   status: "error",
        // });
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

    return latestRecord.user_balance;
  };

  const fetchRecords = async (
    userId: string,
    balance: number
  ): Promise<void> => {
    try {
      const response = await api.get<{ records: Record[] }>(
        `/records?userId=${userId}`
      );

      const latestBalance = getLatestUserBalance(response.records, balance);

      dispatch(updateRecords(response.records));
      dispatch(updateBalance(latestBalance));
    } catch (error) {
      // toast.showToast({
      //   title: "Erro",
      //   description: "Falha ao buscar registros.",
      //   status: "error",
      // });
      throw error;
    }
  };

  const deleteRecord = async (recordId: string): Promise<void> => {
    try {
      // Faz a requisição de deleção
      await api.delete(`/records/${recordId}`);

      // Remove o registro diretamente da pilha do Redux
      dispatch(removeRecord(recordId));

      // Mostra mensagem de sucesso
      // toast.showToast({
      //   title: "Record Deleted",
      //   description: "The record has been successfully deleted.",
      //   status: "success",
      // });
    } catch (error) {
      // Mostra mensagem de erro
      // toast.showToast({
      //   title: "Record Deletion Failed",
      //   description: "An error occurred while deleting the record.",
      //   status: "error",
      // });
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
  };
};
