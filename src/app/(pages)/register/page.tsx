// RegisterPage.tsx
"use client";

import RegisterBox from "@/app/components/organisms/RegisterBox";
import { Box } from "@chakra-ui/react";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, gray.900, gray.800)"
    >
      <RegisterBox />
    </Box>
  );
};

export default RegisterPage;
