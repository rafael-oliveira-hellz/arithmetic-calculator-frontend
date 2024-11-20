"use client";

import React, { useCallback, useState, useMemo, useEffect } from "react";
import { Box, Table, Tbody, Flex, Text, Select } from "@chakra-ui/react";
import RecordTableHeader from "../../molecules/RecordTableHeader";
import RecordTableRow from "../../molecules/RecordTableRow";
import PaginationControls from "../../molecules/PaginationControls";
import Filters from "../../molecules/Filters";
import { useRecordService } from "@/app/hooks/useRecordService";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

const RecordsTable = (): React.JSX.Element => {
  const { fetchRecords } = useRecordService();
  const { records, totalPages, isFirst, isLast } = useSelector(
    (state: RootState) => state.records
  );

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    fetchRecords(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, fetchRecords]);

  const [filters, setFilters] = useState({
    type: "",
    amount: "",
  });

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleFilterChange = useCallback((field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(0);
  }, []);

  const handleSortToggle = useCallback(() => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => !record.deleted)
      .filter((record) =>
        filters.type ? record.operation.type.includes(filters.type) : true
      )
      .filter((record) =>
        filters.amount
          ? record.amount.toString().includes(filters.amount)
          : true
      );
  }, [records, filters]);

  return (
    <Box>
      <Flex justify="space-between" mb="4" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Registros de Operações
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
              {size} por página
            </option>
          ))}
        </Select>
      </Flex>

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <Table variant="simple">
        <RecordTableHeader
          sortOrder={sortOrder}
          onSortChange={handleSortToggle}
        />
        <Tbody>
          {filteredRecords.map((record) => (
            <RecordTableRow key={record.id} record={record} />
          ))}
        </Tbody>
      </Table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={isFirst}
        isLast={isLast}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        onNext={() =>
          setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
        }
      />
    </Box>
  );
};

export default RecordsTable;
