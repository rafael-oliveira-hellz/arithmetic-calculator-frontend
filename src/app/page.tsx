"use client";

import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import AuthGuard from "./components/guards/auth-guard";
import OperationsForm from "./components/organisms/OperationForm";
import RecordsTable from "./components/organisms/RecordsTable";
import { Record } from "@/shared/interfaces/records";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useAuthService } from "./hooks/useAuthService";

export default function Home() {
  const [records, setRecords] = useState<Record[]>([]);

  const { balance } = useSelector((state: RootState) => state.auth);
  const { fetchRecords } = useAuthService();

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const result = await fetchRecords(balance);
        setRecords(result);
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };

    loadRecords();
  }, [balance, fetchRecords]);

  return (
    <AuthGuard>
      <Grid
        templateRows="auto auto 1fr"
        minH="100vh"
        bg="gray.900"
        color="white"
        gap="4"
        p="4"
      >
        <GridItem bg="gray.800" p="4" borderRadius="md">
          <Box>
            <Heading fontSize="2xl" fontWeight="bold" textAlign="center" my={6}>
              Balance: {balance} credits
            </Heading>
          </Box>
        </GridItem>

        <GridItem bg="gray.800" p="4" borderRadius="md">
          <OperationsForm />
        </GridItem>

        <GridItem bg="gray.800" p="4" borderRadius="md">
          <Box>
            <RecordsTable records={records} />
          </Box>
        </GridItem>
      </Grid>
    </AuthGuard>
  );
}
