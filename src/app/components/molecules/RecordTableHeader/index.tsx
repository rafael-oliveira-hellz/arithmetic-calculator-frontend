import React from "react";
import { Thead, Th, Tr, IconButton, Box } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

interface RecordTableHeaderProps {
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
}

const headers = [
  { label: "TYPE", colSpan: 1 },
  { label: "OPERATION COST", colSpan: 2 },
  { label: "USER BALANCE", colSpan: 2 },
  { label: "OPERATION RESPONSE", colSpan: 1 },
  { label: "ACTIONS", colSpan: 1 },
];

const RecordTableHeader: React.FC<RecordTableHeaderProps> = ({
  sortOrder,
  onSortChange,
}) => {
  return (
    <Thead>
      <Tr>
        {headers.map((header, index) => (
          <Th key={index} colSpan={header.colSpan} textAlign="center">
            {header.label}
          </Th>
        ))}
        <Th textAlign="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="2"
          >
            DATE
            <IconButton
              aria-label="Sort operation by date"
              data-testid={
                sortOrder === "asc" ? "arrow-up-icon" : "arrow-down-icon"
              }
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
