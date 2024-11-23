"use client";

import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import AuthGuard from "@/app/components/guards/auth-guard";
import RecordsTable from "@/app/components/organisms/RecordsTable";
import Text from "@/app/components/atoms/Text";

const RecordsPage: React.FC = () => {
  return (
    <AuthGuard>
      <Box
        bg="gray.800"
        borderRadius="md"
        boxShadow="md"
        marginInline="6"
        mt="6"
        maxWidth="100%"
        minHeight={"calc(100vh - 180px)"}
      >
        <Heading>
          <Text fontSize="2xl" color="#FFF">
            Operation Records
          </Text>
        </Heading>
        <RecordsTable />
      </Box>
    </AuthGuard>
  );
};

export default RecordsPage;
