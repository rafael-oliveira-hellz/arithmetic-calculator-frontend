import React from "react";
import { Flex, Box } from "@chakra-ui/react";

interface DataTableHeaderProps {
  sortKey: string | null;
  sortDirection: "asc" | "desc";
  onSort: (key: string) => void;
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  sortKey,
  sortDirection,
  onSort,
}) => {
  const getSortIndicator = (key: string) => {
    if (sortKey !== key) return "";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <Flex
      as="header"
      bg="gray.100"
      p={4}
      fontWeight="bold"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Box flex="1" cursor="pointer" onClick={() => onSort("operation_id")}>
        Operation ID {getSortIndicator("operation_id")}
      </Box>
      <Box flex="1" cursor="pointer" onClick={() => onSort("amount")}>
        Amount {getSortIndicator("amount")}
      </Box>
      <Box flex="1" cursor="pointer" onClick={() => onSort("user_balance")}>
        User Balance {getSortIndicator("user_balance")}
      </Box>
      <Box
        flex="1"
        cursor="pointer"
        onClick={() => onSort("operation_response")}
      >
        Operation Response {getSortIndicator("operation_response")}
      </Box>
      <Box flex="1" cursor="pointer" onClick={() => onSort("date")}>
        Date {getSortIndicator("date")}
      </Box>
      <Box flex="1">Actions</Box>
    </Flex>
  );
};

export default DataTableHeader;
