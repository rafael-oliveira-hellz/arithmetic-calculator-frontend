"use client";

import { Box } from "@chakra-ui/react";
import Text from "./components/atoms/Text";
import AuthGuard from "./components/guards/auth-guard";

export default function Home() {
  console.log("Home component is rendering");
  return (
    <AuthGuard>
      <Box>
        <Text variant="large" color="#171717" backgroundColor="transparent">
          Bem-vindo à Página Inicial
        </Text>
      </Box>
    </AuthGuard>
  );
}
