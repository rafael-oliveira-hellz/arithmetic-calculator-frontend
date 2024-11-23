import React from "react";
import { Thead, Th, Tr, IconButton, Box } from "@chakra-ui/react";
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
        <Th textAlign="center">TYPE</Th>
        <Th colSpan={2} textAlign="center">
          OPERATION COST
        </Th>
        <Th colSpan={2} textAlign="center">
          USER BALANCE
        </Th>
        <Th textAlign="center">OPERATION RESPONSE</Th>
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
        <Th textAlign="center">ACTIONS</Th>
      </Tr>
    </Thead>
  );
};

export default RecordTableHeader;
