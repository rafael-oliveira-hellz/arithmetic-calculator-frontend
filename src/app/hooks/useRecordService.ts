"use client";

import useSWR, { mutate } from "swr";
import useApi from "./useApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { removeRecord, setRecords } from "../store/slices/record-slice";
import { Record, RecordsResponse } from "@/shared/interfaces/records";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export const useRecordService = () => {
  const api = useApi();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

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

    dispatch(
      setRecords({
        records: data?.content || [],
        totalPages: data?.totalPages || 1,
        isFirst: data?.first || true,
        isLast: data?.last || false,
      })
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
    setIsDeleting(true);
    try {
      await mutate(
        `/records`,
        (data: RecordsResponse | undefined) => {
          if (!data || !data.content) return data;
          return {
            ...data,
            content: data.content.filter((record) => record.id !== recordId),
          };
        },
        false
      );

      await api.delete(`/records/${recordId}`);
      dispatch(removeRecord(recordId));

      toast({
        title: "Success",
        description: "Record deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      await revalidateRecords();
    } catch (error) {
      console.error("Error during deletion:", error);
      toast({
        title: "Action failed",
        description: `Record deletion failed: ${
          error instanceof Error ? error.message : error
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  const addRecord = async (newRecord: Record): Promise<void> => {
    try {
      await mutate(
        `/records`,
        (data: RecordsResponse | undefined) => {
          if (!data || !data.content) return data;
          return {
            ...data,
            content: [newRecord, ...data.content],
          };
        },
        false
      );

      await revalidateRecords();
    } catch (error) {
      console.error("Error adding record:", error);
      toast({
        title: "Action failed",
        description: `Failed to add record: ${
          error instanceof Error ? error.message : error
        }`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return {
    deleteRecord,
    useRecords,
    revalidateRecords,
    isDeleting,
    addRecord,
  };
};
