import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { Record } from "@/shared/interfaces/records";

interface RecordTableRowProps {
  record: Record;
}

const RecordTableRow: React.FC<RecordTableRowProps> = ({ record }) => {
  return (
    <Tr>
      <Td>{record.operation.type}</Td>
      <Td>{record.amount}</Td>
      <Td>{record.operationResponse}</Td>
      <Td>{record.userBalance}</Td>
      <Td>{new Date(record.date).toLocaleString()}</Td>
    </Tr>
  );
};

export default RecordTableRow;
