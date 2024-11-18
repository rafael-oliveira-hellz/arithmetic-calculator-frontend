import React, { useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import DataTablePagination from "./DataTablePagination";
import DataTableFilter from "./DataTableFilter";
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";

interface DataTableProps {
  data: Array<{
    id: string;
    operation_id: string;
    amount: number;
    user_balance: number;
    operation_response: string;
    date: string;
  }>;
  onDelete: (operationId: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onDelete }) => {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Dynamically controlled

  // Filtered Data
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      row.operation_response.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  // Sorted Data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey as keyof typeof a];
      const bValue = b[sortKey as keyof typeof b];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Paginated Data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <Box>
      <DataTableFilter value={filter} onChange={setFilter} />
      <Box
        as="section"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        overflow="hidden"
      >
        <DataTableHeader
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
        <DataTableBody data={paginatedData} onDelete={onDelete} />
      </Box>
      <DataTablePagination
        currentPage={currentPage}
        totalItems={sortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </Box>
  );
};

export default DataTable;
