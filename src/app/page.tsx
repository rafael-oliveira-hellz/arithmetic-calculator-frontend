"use client";

import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
// import AuthGuard from "./components/guards/auth-guard";
import OperationsForm from "./components/organisms/OperationForm";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Text from "./components/atoms/Text";

export default function Home() {
  const { balance } = useSelector((state: RootState) => state.auth);

  return (
    // <AuthGuard>
    <Grid
      templateRows="auto 1fr"
      minH="calc(100% - 60px)"
      bg="gray.100"
      color="#FFF"
      gap="4"
      p="4"
    >
      <GridItem bg="gray.800" p="4" borderRadius="md">
        <Box>
          <Heading fontSize="2xl" fontWeight="bold" textAlign="center" my={6}>
            Balance
            <Text fontSize="2xl" color="green.500" mt={4}>
              {balance}
            </Text>
          </Heading>
        </Box>
      </GridItem>

      <GridItem bg="gray.800" p="4" borderRadius="md" overflow="auto">
        <OperationsForm balance={balance} />
      </GridItem>
    </Grid>
    // </AuthGuard>
  );
}
