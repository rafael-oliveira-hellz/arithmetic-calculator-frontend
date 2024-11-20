"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Record } from "@/shared/interfaces/record";
import Dropdown from "../../atoms/Dropdown";

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

  // Garante que records seja um array antes de usar
  const filteredRecords = useMemo(() => {
    return records
      .filter((record) => !record.deleted) // Filtra apenas os que não estão deletados
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
          colorScheme="teal"
        >
          Ordenar por Data ({sortOrder === "asc" ? "Asc" : "Desc"})
        </Button>
      </Flex>

      {/* Filtros */}
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

        <Input
          placeholder="Filtrar por Valor"
          value={filters.amount}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, amount: e.target.value }))
          }
        />

        <Input
          placeholder="Filtrar por Data"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value }))
          }
        />
      </Flex>

      {/* Tabela */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Tipo</Th>
            <Th>Valor</Th>
            <Th>Resposta</Th>
            <Th>Saldo do Usuário</Th>
            <Th>Data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedRecords.map((record) => (
            <Tr key={record.id}>
              <Td>{record.operation.type}</Td>
              <Td>{record.amount}</Td>
              <Td>{record.operationResponse}</Td>
              <Td>{record.userBalance}</Td>
              <Td>{new Date(record.date).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Paginação */}
      <Flex justify="space-between" alignItems="center" mt="4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          isDisabled={currentPage === 0}
        >
          Página Anterior
        </Button>
        <Text>
          Página {currentPage + 1} de{" "}
          {Math.ceil(sortedRecords.length / recordsPerPage)}
        </Text>
        <Button
          onClick={() =>
            setCurrentPage((prev) =>
              prev + 1 < Math.ceil(sortedRecords.length / recordsPerPage)
                ? prev + 1
                : prev
            )
          }
          isDisabled={
            currentPage + 1 >= Math.ceil(sortedRecords.length / recordsPerPage)
          }
        >
          Próxima Página
        </Button>
      </Flex>
    </Box>
  );
};

export default RecordsTable;
