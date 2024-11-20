"use client";

import React, { useState, useMemo } from "react";
import { Box, Table, Tbody, Flex, Text, Button } from "@chakra-ui/react";
import { Record } from "@/shared/interfaces/records";
import Dropdown from "../../atoms/Dropdown";
import RecordTableHeader from "../../molecules/RecordTableHeader";
import RecordTableRow from "../../molecules/RecordTableRow";
import FilterInput from "../../molecules/FilterInput";
import PaginationControls from "../../molecules/PaginationControls";

interface RecordsTableProps {
  records: Record[];
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records = [] }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({
    type: "",
    amount: "",
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;

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
      )
      .filter((record) =>
        filters.date ? record.date.includes(filters.date) : true
      );
  }, [records, filters]);

  const sortedRecords = useMemo(() => {
    return filteredRecords.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [filteredRecords, sortOrder]);

  const paginatedRecords = useMemo(() => {
    const start = currentPage * recordsPerPage;
    const end = start + recordsPerPage;
    return sortedRecords.slice(start, end);
  }, [sortedRecords, currentPage]);

  const totalPages = Math.ceil(sortedRecords.length / recordsPerPage);

  return (
    <Box>
      <Flex justify="space-between" mb="4" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Registros de Operações
        </Text>
        <Button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          bg="#14CFB1"
          color="#FFF"
          _hover={{ bg: "#12B49C" }}
        >
          Ordenar por Data ({sortOrder === "asc" ? "Asc" : "Desc"})
        </Button>
      </Flex>

      <Flex gap="4" mb="4">
        <Dropdown
          placeholder="Filtrar por Tipo"
          options={[
            { value: "ADDITION", label: "ADDITION" },
            { value: "SUBTRACTION", label: "SUBTRACTION" },
            { value: "MULTIPLICATION", label: "MULTIPLICATION" },
            { value: "DIVISION", label: "DIVISION" },
            { value: "SQUARE_ROOT", label: "SQUARE ROOT" },
            { value: "RANDOM_STRING", label: "RANDOM STRING" },
          ]}
          value={filters.type}
          onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
        />

        <FilterInput
          placeholder="Filtrar por Valor"
          value={filters.amount}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, amount: value }))
          }
        />
      </Flex>

      <Table variant="simple">
        <RecordTableHeader />
        <Tbody>
          {paginatedRecords.map((record) => (
            <RecordTableRow key={record.id} record={record} />
          ))}
        </Tbody>
      </Table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        onNext={() =>
          setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
        }
      />
    </Box>
  );
};

export default RecordsTable;
