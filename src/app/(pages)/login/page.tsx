"use client";

import LoginBox from "@/app/components/organisms/LoginBox";
import { Box } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, #FFFFFF, gray.500)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <LoginBox />
    </Box>
  );
};

export default LoginPage;
