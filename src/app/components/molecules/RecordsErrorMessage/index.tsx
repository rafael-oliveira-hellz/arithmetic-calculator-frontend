"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

interface ErrorMessageProps {
  message: string;
}

const RecordsErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Flex
      justify="center"
      align="center"
      minH="calc(100vh - 180px)"
      bg="gray.800"
      p="6"
    >
      <Box
        bg="red.600"
        color="#FFF"
        p="6"
        borderRadius="md"
        textAlign="center"
        boxShadow="lg"
        maxW="600px"
        width="100%"
      >
        <Text
          aria-label="Error"
          role="alert"
          data-testid="error-message"
          fontSize="2xl"
          fontWeight="bold"
          mb="4"
        >
          Error
        </Text>
        <Text fontSize="lg">{message}</Text>
      </Box>
    </Flex>
  );
};

export default RecordsErrorMessage;
