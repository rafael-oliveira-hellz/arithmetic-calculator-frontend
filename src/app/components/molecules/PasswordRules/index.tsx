// PasswordRules.tsx
"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface PasswordRulesProps {
  password: string;
}

const PasswordRules: React.FC<PasswordRulesProps> = ({ password }) => {
  const rules = [
    {
      test: (pw: string) => pw.length >= 8,
      message: "Mínimo de 8 caracteres",
    },
    {
      test: (pw: string) => /[A-Z]/.test(pw),
      message: "Pelo menos uma letra maiúscula",
    },
    {
      test: (pw: string) => /[a-z]/.test(pw),
      message: "Pelo menos uma letra minúscula",
    },
    {
      test: (pw: string) => /[0-9]/.test(pw),
      message: "Pelo menos um número",
    },
    {
      test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
      message: "Pelo menos um caractere especial",
    },
    {
      test: (pw: string) => !/[\sáàâãäéèêëíìîïóòôõöúùûüçñ]/i.test(pw),
      message: "Não conter espaços ou caracteres acentuados",
    },
  ];

  return (
    <Box mt={2}>
      {rules.map((rule, index) => {
        const isValid = rule.test(password);
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

export default PasswordRules;
