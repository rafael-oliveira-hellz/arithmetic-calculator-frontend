import React from "react";
import { Tr, Td, Tooltip } from "@chakra-ui/react";
import { Record } from "@/shared/interfaces/records";
import { DeleteIcon } from "@chakra-ui/icons";
import Button from "../../atoms/Button";

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
      <Td colSpan={2}>{record.operation.cost}</Td>
      <Td colSpan={2}>{record.userBalance}</Td>
      <Td>{record.operationResponse}</Td>
      <Td>{new Date(record.date).toLocaleString()}</Td>
      <Td>
        <Tooltip label="Delete Record" aria-label="Delete Record">
          <Button
            aria-label="Delete"
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
