"use client";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import Text from "./components/atoms/Text";
import AuthGuard from "./components/guards/auth-guard";
import OperationsForm from "./components/organisms/OperationForm";
import RecordsTable from "./components/organisms/RecordsTable";
import { Record } from "@/shared/interfaces/record";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export default function Home() {
  const [records, setRecords] = useState<Record[]>([]);

  const { balance } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // fetch("/api/records")
    //   .then((res) => res.json())
    //   .then((data) => setRecords(data.content));

    const mockRecords = [
      {
        id: "7383fb94-e4ec-495d-9e49-34f5fbeb4236",
        operation: {
          id: "1c38e975-531c-435f-bf6e-d46f1a2c2a06",
          type: "ADDITION",
          cost: 5,
        },
        user: "23ac8a9a-d0e1-7058-d06e-8e1fd86269fd",
        amount: 5,
        userBalance: 95,
        operationResponse: "10",
        date: "2024-11-19T19:15:06",
        deleted: false,
      },
      {
        id: "7383fb94-e4ec-4975-9e49-34f5fbeb4236",
        operation: {
          id: "1c38e955-531c-431f-bf6e-d46f1a2c2a06",
          type: "ADDITION",
          cost: 5,
        },
        user: "23ac559a-d0e1-70b8-d06e-8e1fd86269fd",
        amount: 5,
        userBalance: 95,
        operationResponse: "10",
        date: "2024-11-19T19:15:06",
        deleted: false,
      },
      {
        id: "7383fb44-e4ec-4903-9e49-34f5fbeb4236",
        operation: {
          id: "1c38e975-531c-441f-bf6e-d46f1a2c2a06",
          type: "ADDITION",
          cost: 5,
        },
        user: "23ac8a9a-d0e1-7048-d06e-8e1fd86269fd",
        amount: 5,
        userBalance: 95,
        operationResponse: "10",
        date: "2024-11-19T19:15:06",
        deleted: false,
      },
    ];

    setRecords(mockRecords);
  }, []);

  console.log("Home component is rendering");
  return (
    <AuthGuard>
      <Grid
        templateRows="auto auto 1fr" // Alturas dinâmicas: superior, meio, inferior
        minH="100vh" // Ocupa a altura total da tela
        bg="gray.900" // Cor de fundo global
        color="white" // Cor do texto
        gap="4" // Espaçamento entre as áreas
        p="4" // Padding geral
      >
        {/* Área Superior - Balance do usuário */}
        <GridItem bg="gray.800" p="4" borderRadius="md">
          <Box>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              Balance: {balance} credits
            </Text>
          </Box>
        </GridItem>

        {/* Área do Meio - Formulário de Operações */}
        <GridItem bg="gray.800" p="4" borderRadius="md">
          <OperationsForm />
        </GridItem>

        {/* Área Inferior - DataTable de registros */}
        <GridItem bg="gray.800" p="4" borderRadius="md">
          <Box>
            <RecordsTable records={records} />
          </Box>
        </GridItem>
      </Grid>
      <Box>
        <Text variant="large" color="#171717" backgroundColor="transparent">
          Wlecome to the Home Page!
        </Text>
      </Box>
    </AuthGuard>
  );
}
