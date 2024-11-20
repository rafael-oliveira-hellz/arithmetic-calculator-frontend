"use client";

import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import AuthGuard from "./components/guards/auth-guard";
import OperationsForm from "./components/organisms/OperationForm";
import RecordsTable from "./components/organisms/RecordsTable";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Text from "./components/atoms/Text";

export default function Home() {
  const { balance } = useSelector((state: RootState) => state.auth);

  return (
    <AuthGuard>
      <Grid
        templateRows="auto auto 1fr"
        minH="100vh"
        bg={"gray.100"}
        color="#FFF"
        gap="4"
        p="4"
      >
        <GridItem bg="gray.800" p="4" borderRadius="md">
          <Box>
            <Heading fontSize="2xl" fontWeight="bold" textAlign="center" my={6}>
              Balance{" "}
              <Text fontSize="2xl" color="green.500">
                {balance}
              </Text>
            </Heading>
          </Box>
        </GridItem>

        <GridItem bg="gray.800" p="4" borderRadius="md">
          <OperationsForm />
        </GridItem>

        <GridItem bg="gray.800" p="4" borderRadius="md">
          <Box>
            <RecordsTable />
          </Box>
        </GridItem>
      </Grid>
    </AuthGuard>
  );
}
