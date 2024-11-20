import React from "react";
import { Tr, Td, Tooltip } from "@chakra-ui/react";
import { Record } from "@/shared/interfaces/records";
import Button from "../../atoms/Button";
import { DeleteIcon } from "@chakra-ui/icons";

interface RecordTableRowProps {
  record: Record;
  onDelete: (recordId: string) => void; // Prop para chamar a função de deleção
}

const RecordTableRow: React.FC<RecordTableRowProps> = ({
  record,
  onDelete,
}) => {
  return (
    <Tr>
      <Td>{record.operation.type}</Td>
      <Td>{record.amount}</Td>
      <Td>{record.operationResponse}</Td>
      <Td>{record.userBalance}</Td>
      <Td>{new Date(record.date).toLocaleString()}</Td>
      <Td>
        <Tooltip label="Deletar Registro" aria-label="Deletar Registro">
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => onDelete(record.id)}
            leftIcon={<DeleteIcon />}
          >
            Deletar
          </Button>
        </Tooltip>
      </Td>
    </Tr>
  );
};

export default RecordTableRow;
