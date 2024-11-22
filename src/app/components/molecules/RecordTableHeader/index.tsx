import React from "react";
import { Thead, Th, IconButton, Box } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import CenteredRow from "../../atoms/CenteredRow";

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
      <CenteredRow>
        <Th>TYPE</Th>
        <Th colSpan={2}>OPERATION COST</Th>
        <Th colSpan={2}>USER BALANCE</Th>
        <Th>OPERATION RESPONSE</Th>
        <Th>
          <Box
            display="flex"
            alignItems="center"
            gap="2"
            justifyContent="center"
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
        <Th>ACTIONS</Th>
      </CenteredRow>
    </Thead>
  );
};

export default RecordTableHeader;
