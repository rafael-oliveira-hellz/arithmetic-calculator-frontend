"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface EmailRulesProps {
  email: string;
}

const EmailRules: React.FC<EmailRulesProps> = ({ email }) => {
  const rules = [
    {
      test: (em: string) => /\S+@\S+\.\S+/.test(em),
      message: "Formato de email válido (ex: exemplo@dominio.com)",
    },
    {
      test: (em: string) => !/[\s]/.test(em),
      message: "Não conter espaços",
    },
    {
      test: (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em),
      message: "Conter um domínio válido",
    },
  ];

  return (
    <Box mt={2}>
      {rules.map((rule, index) => {
        const isValid = rule.test(email);
        console.log("index: Email rules: ", index);
        return (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            color={isValid ? "green.500" : "red.500"}
            mb={1}
          >
            {isValid ? (
              <CheckIcon color="green.500" mr={2} />
            ) : (
              <CloseIcon color="red.500" mr={2} />
            )}
            <Text>{rule.message}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default EmailRules;
