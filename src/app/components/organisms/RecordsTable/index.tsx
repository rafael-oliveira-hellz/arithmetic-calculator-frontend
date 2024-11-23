"use client";

import React, { useCallback, useState, useMemo } from "react";
import {
  Box,
  Table,
  Tbody,
  Flex,
  Text,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import RecordTableHeader from "../../molecules/RecordTableHeader";
import RecordTableRow from "../../molecules/RecordTableRow";
import PaginationControls from "../../molecules/PaginationControls";
import Filters from "../../molecules/Filters";
import { useRecordService } from "@/app/hooks/useRecordService";
import ErrorMessage from "../../molecules/RecordsErrorMessage";

const RecordsTable = (): React.JSX.Element => {
  const { useRecords, deleteRecord, revalidateRecords, isDeleting } =
    useRecordService();

  const toast = useToast();

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState({ type: "", amount: "" });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { records, totalPages, isLoading, error } = useRecords(
    currentPage - 1,
    itemsPerPage
  );

  const handleFilterChange = useCallback((field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  }, []);

  const handleDelete = async (recordId: string) => {
    try {
      await deleteRecord(recordId, currentPage - 1, itemsPerPage);
      await revalidateRecords();
    } catch (error) {
      toast({
        title: "Action failed",
        description: `${error instanceof Error ? error.message : error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleSortToggle = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const filteredRecords = useMemo(() => {
    const sortedRecords = [...records];

    if (sortOrder === "asc") {
      sortedRecords.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      sortedRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return sortedRecords
      .filter((record) => !record.deleted)
      .filter((record) =>
        filters.type ? record.operation?.type?.includes(filters.type) : true
      )
      .filter((record) =>
        filters.amount
          ? record.amount?.toString().includes(filters.amount)
          : true
      );
  }, [records, filters, sortOrder]);

  if (isLoading || isDeleting) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Spinner size="lg" color="#14CFB1" role="status" />
      </Flex>
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Unable to load records. Please try again later or contact support." />
    );
  }

  return (
    <Box
      mt="4"
      bg="gray.800"
      p="6"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      minH="80vh"
    >
      <Flex justify="space-between" mb="4" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Operation Records
        </Text>
        <Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          bg="gray.700"
          color="#FFF"
          maxW="150px"
        >
          {[10, 20, 30, 50, 100].map((size) => (
            <option
              key={size}
              value={size}
              style={{ backgroundColor: "#1A202C", color: "#FFF" }}
            >
              {size} per page
            </option>
          ))}
        </Select>
      </Flex>

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <Table variant="simple" width="100%" bg="gray.800" color="#FFF">
        <RecordTableHeader
          sortOrder={sortOrder}
          onSortChange={handleSortToggle}
        />
        <Tbody>
          {filteredRecords.map((record) => {
            return (
              <RecordTableRow
                key={record.id}
                record={record}
                onDelete={handleDelete}
              />
            );
          })}
        </Tbody>
      </Table>

      <Flex mt="auto" justify="center">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNext={() =>
            setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
          }
        />
      </Flex>
    </Box>
  );
};

export default RecordsTable;
