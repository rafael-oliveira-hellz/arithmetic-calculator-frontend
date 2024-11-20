"use client";

import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import AuthGuard from "./components/guards/auth-guard";
import OperationsForm from "./components/organisms/OperationForm";
import RecordsTable from "./components/organisms/RecordsTable";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export default function Home() {
  const { balance } = useSelector((state: RootState) => state.auth);

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
            <RecordsTable balance={balance} />
          </Box>
        </GridItem>
      </Grid>
    </AuthGuard>
  );
}
