"use client";

import useSWR, { mutate } from "swr";
import useApi from "./useApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { removeRecord } from "../store/slices/record-slice";
import { RecordsResponse } from "@/shared/interfaces/records";
import { useToast } from "@chakra-ui/react";

export const useRecordService = () => {
  const api = useApi();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();

  const fetchRecords = async (
    page: number,
    itemsPerPage: number
  ): Promise<RecordsResponse> => {
    try {
      return await api.get<RecordsResponse>(
        `/records?page=${page}&size=${itemsPerPage}`
      );
    } catch (error) {
      throw error;
    }
  };

  const revalidateRecords = async () => {
    await mutate(`/records`);
  };

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
      isLast: data?.last || false,
      isLoading: !data && !error && isValidating,
      error,
    };
  };

  const deleteRecord = async (recordId: string): Promise<void> => {
    try {
      await api.delete(`/records/${recordId}`);
      dispatch(removeRecord(recordId));
      toast({
        title: "Success",
        description: "Record deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Action failed",
        description: `Record deletion failed: ${
          error instanceof Error ? error.message : error
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  return {
    deleteRecord,
    useRecords,
    revalidateRecords,
  };
};
