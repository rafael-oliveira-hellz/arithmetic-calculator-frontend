import React from "react";
import { Thead, Tr, Th, IconButton } from "@chakra-ui/react";
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
        <Th>TYPE</Th>
        <Th colSpan={2}>OPERATION COST</Th>
        <Th colSpan={2}>USER BALANCE</Th>
        <Th>OPERATION RESPONSE</Th>
        <Th>
          <Text>DATE</Text>
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
        </Th>
        <Th>ACTIONS</Th>
      </Tr>
    </Thead>
  );
};

export default RecordTableHeader;
