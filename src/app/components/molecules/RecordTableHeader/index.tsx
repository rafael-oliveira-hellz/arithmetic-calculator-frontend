import React from "react";
import { Thead, Tr, Th, IconButton, Box } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

interface RecordTableHeaderProps {
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
}

const RecordTableHeader: React.FC<RecordTableHeaderProps> = ({
  sortOrder,
  onSortChange,
}) => {
  return (
    <Thead>
      <Tr>
        <Th>Type</Th>
        <Th>Amount</Th>
        <Th>Operation Response</Th>
        <Th>User Balance</Th>
        <Th>
          <Box display="flex" alignItems="center" gap="2">
            Date
            <IconButton
              aria-label="Sort by date"
              icon={sortOrder === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              onClick={onSortChange}
              size="sm"
              variant="ghost"
              bg="#14CFB1"
              color="#FFF"
              _hover={{ bg: "#12B49C" }}
            />
          </Box>
        </Th>
      </Tr>
    </Thead>
  );
};

export default RecordTableHeader;
