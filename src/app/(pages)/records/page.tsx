"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import RecordsTable from "@/app/components/organisms/RecordsTable";
import AuthGuard from "@/app/components/guards/auth-guard";

const RecordsPage: React.FC = () => {
  return (
    <AuthGuard>
      <Box
        bg="gray.800"
        p="6"
        borderRadius="md"
        boxShadow="md"
        maxWidth="1200px"
        margin="0 auto"
        mt="6"
      >
        <RecordsTable />
      </Box>
    </AuthGuard>
  );
};

export default RecordsPage;
