import React from "react";
import { Box } from "@chakra-ui/react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      bg="gray.50"
      shadow="sm"
    >
      {children}
    </Box>
  );
};

export default Card;
