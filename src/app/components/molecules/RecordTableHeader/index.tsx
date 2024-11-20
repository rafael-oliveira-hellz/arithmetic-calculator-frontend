import React from "react";
import { Thead, Tr, Th, IconButton, Box, Flex } from "@chakra-ui/react";
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
        <Flex justify="space-between" align="center" gap="4">
          <Text>OPERATION COST</Text>
          <Text>USER BALANCE</Text>
        </Flex>
        <Th>USER BALANCE</Th>
        <Th>
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
        <Th>ACTIONS</Th>
      </Tr>
    </Thead>
  );
};

export default RecordTableHeader;
