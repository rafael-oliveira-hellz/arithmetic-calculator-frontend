"use client";

import { useToast } from "./useToast";

import useApi from "./useApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { removeRecord, setRecords } from "../store/slices/record-slice";
import { RecordsResponse } from "@/shared/interfaces/records";

export const useRecordService = () => {
  const api = useApi();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();

  const fetchRecords = async (
    page: number,
    itemsPerPage: number
  ): Promise<void> => {
    const response = await api.get<RecordsResponse>(
      `/records?page=${page}&size=${itemsPerPage}`
    );
    dispatch(
      setRecords({
        records: response.content,
        totalPages: response.totalPages,
        isFirst: response.first,
        isLast: response.last,
      })
    );
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
    fetchRecords,
    deleteRecord,
  };
};
