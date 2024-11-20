import React from "react";
import { Thead, Tr, Th } from "@chakra-ui/react";

const RecordTableHeader: React.FC = () => {
  return (
    <Thead>
      <Tr>
        <Th>Tipo</Th>
        <Th>Valor</Th>
        <Th>Resposta</Th>
        <Th>Saldo do Usuário</Th>
        <Th>Data</Th>
      </Tr>
    </Thead>
  );
};

export default RecordTableHeader;
