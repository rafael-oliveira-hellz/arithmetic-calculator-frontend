"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import AuthGuard from "@/app/components/guards/auth-guard";
import RecordsTable from "@/app/components/organisms/RecordsTable";

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
        <RecordsTable />
      </Box>
    </AuthGuard>
  );
};

export default RecordsPage;
