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
        borderRadius="md"
        boxShadow="md"
        margin="0 auto"
        mt="6"
      >
        <RecordsTable />
      </Box>
    </AuthGuard>
  );
};

export default RecordsPage;
