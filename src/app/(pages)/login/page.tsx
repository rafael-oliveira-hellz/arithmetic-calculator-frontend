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
      bgGradient="linear(to-br, gray.900, gray.800)"
    >
      <LoginBox />
    </Box>
  );
};

export default LoginPage;
