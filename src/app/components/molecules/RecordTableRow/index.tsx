import React from "react";
import { Tr, Td, Tooltip, Flex } from "@chakra-ui/react";
import { Record } from "@/shared/interfaces/records";
import Button from "../../atoms/Button";
import { DeleteIcon } from "@chakra-ui/icons";
import Text from "../../atoms/Text";

interface RecordTableRowProps {
  record: Record;
  onDelete: (recordId: string) => void;
}

const RecordTableRow: React.FC<RecordTableRowProps> = ({
  record,
  onDelete,
}) => {
  return (
    <Tr>
      <Td>{record.operation.type}</Td>
      <Td>
        <Flex
          justify="space-between"
          align="center"
          gap="4"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <Text>{record.operation.cost}</Text>
          <Text>{record.userBalance}</Text>
        </Flex>
      </Td>
      <Td>{record.operationResponse}</Td>
      <Td>{new Date(record.date).toLocaleString()}</Td>
      <Td>
        <Tooltip label="Delete Record" aria-label="Delete Record">
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => onDelete(record.id)}
            leftIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Tooltip>
      </Td>
    </Tr>
  );
};

export default RecordTableRow;
