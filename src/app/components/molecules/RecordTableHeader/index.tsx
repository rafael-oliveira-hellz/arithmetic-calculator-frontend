import React from "react";
import { Thead, Tr, Th, IconButton, Box } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import Text from "../../atoms/Text";

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
        <Th
          whiteSpace="nowrap"
          fontWeight="bold"
          fontSize="lg"
          textAlign="center"
        >
          TYPE
        </Th>
        <Th
          colSpan={2}
          whiteSpace="nowrap"
          fontWeight="bold"
          fontSize="lg"
          textAlign="center"
        >
          OPERATION COST
        </Th>
        <Th
          colSpan={2}
          whiteSpace="nowrap"
          fontWeight="bold"
          fontSize="lg"
          textAlign="center"
        >
          USER BALANCE
        </Th>
        <Th
          whiteSpace="nowrap"
          fontWeight="bold"
          fontSize="lg"
          textAlign="center"
        >
          OPERATION RESPONSE
        </Th>
        <Th fontWeight="bold" fontSize="lg" textAlign="center">
          <Box display="flex" alignItems="center" gap="2">
            DATE
            <IconButton
              aria-label="Sort operation by date"
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
        <Th
          whiteSpace="nowrap"
          fontWeight="bold"
          fontSize="lg"
          textAlign="center"
        >
          ACTIONS
        </Th>
      </Tr>
    </Thead>
  );
};

export default RecordTableHeader;
