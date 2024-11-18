import React from "react";
import { Flex, Box, Button } from "@chakra-ui/react";

interface DataTableBodyProps {
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

const DataTableBody: React.FC<DataTableBodyProps> = ({ data, onDelete }) => {
  return (
    <>
      {data.map((row) => (
        <Flex
          key={row.id}
          as="section"
          p={4}
          borderBottom="1px solid"
          borderColor="gray.200"
          align="center"
        >
          <Box flex="1">{row.operation_id}</Box>
          <Box flex="1">{row.amount}</Box>
          <Box flex="1">{row.user_balance}</Box>
          <Box flex="1">{row.operation_response}</Box>
          <Box flex="1">{row.date}</Box>
          <Box flex="1">
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => onDelete(row.id)}
            >
              Delete
            </Button>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default DataTableBody;
