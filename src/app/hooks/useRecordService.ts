"use client";

import { useToast } from "./useToast";
import useSWR from "swr";
import useApi from "./useApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { removeRecord } from "../store/slices/record-slice";
import { RecordsResponse } from "@/shared/interfaces/records";

export const useRecordService = () => {
  const api = useApi();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();

  // Função de fetch para usar no SWR
  const fetchRecords = async (
    page: number,
    itemsPerPage: number
  ): Promise<RecordsResponse> => {
    try {
      const response = await api.get<RecordsResponse>(
        `/records?page=${page}&size=${itemsPerPage}`
      );
      return response;
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      throw error;
    }
  };

  // Hook para gerenciar registros
  const useRecords = (page: number, itemsPerPage: number) => {
    const { data, error, isValidating } = useSWR(
      [`/records`, page, itemsPerPage],
      () => fetchRecords(page, itemsPerPage),
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 5000,
      }
    );

    return {
      records: data?.content || [],
      totalPages: data?.totalPages || 0,
      isFirst: data?.first || true,
      isLast: data?.last || true,
      isLoading: !data && !error && isValidating,
      error,
    };
  };

  const deleteRecord = async (recordId: string): Promise<void> => {
    try {
      await api.delete(`/records/${recordId}`);
      dispatch(removeRecord(recordId));
      toast.showToast({
        title: "Sucesso",
        description: "Registro excluído com sucesso.",
        status: "success",
      });
    } catch (error) {
      toast.showToast({
        title: "Erro",
        description: "Erro ao excluir registro.",
        status: "error",
      });
      throw error;
    }
  };

  return {
    deleteRecord,
    useRecords,
  };
};
