import React from "react";
import { Td, Tooltip } from "@chakra-ui/react";
import { Record } from "@/shared/interfaces/records";
import { DeleteIcon } from "@chakra-ui/icons";
import Button from "../../atoms/Button";
import CenteredRow from "../../atoms/CenteredRow";

interface RecordTableRowProps {
  record: Record;
  onDelete: (recordId: string) => void;
}

const RecordTableRow: React.FC<RecordTableRowProps> = ({
  record,
  onDelete,
}) => {
  return (
    <CenteredRow>
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
    </CenteredRow>
  );
};

export default RecordTableRow;
