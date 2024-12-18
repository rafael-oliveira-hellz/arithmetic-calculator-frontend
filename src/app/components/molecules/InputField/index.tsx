"use client";

import React, { useState } from "react";
import { Box, InputProps } from "@chakra-ui/react";
import {
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import ErrorMessage from "../../atoms/ErrorMessage";
import Input from "../../atoms/Input";

interface InputFieldProps extends Omit<InputProps, "onChange"> {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  iconType?: "name" | "email" | "password";
  isValid?: boolean;
  dataTestId?: string;
  errorMessage?: string;
}

const iconComponents = {
  name: InfoIcon,
  email: EmailIcon,
  password: LockIcon,
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  placeholder,
  onChange,
  iconType = "email",
  isValid,
  dataTestId,
  errorMessage,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputType =
    iconType === "password" && !showPassword ? "password" : "text";

  const LeftIcon = iconComponents[iconType];

  const borderColor =
    isValid === undefined ? "gray.400" : isValid ? "green.500" : "red.500";

  return (
    <Box mb={4} width="100%" position="relative">
      {iconType && (
        <Box
          position="absolute"
          top="50%"
          left="0.75rem"
          transform="translateY(-50%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
          zIndex={10}
          data-testid={`chakra-${iconType}-icon`}
        >
          <LeftIcon color="gray.800" />
        </Box>
      )}

      <Input
        id={id}
        value={value}
        type={inputType}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="on"
        data-testid={dataTestId}
        aria-invalid={errorMessage ? "true" : "false"}
        pl="2.75rem"
        pr={iconType === "password" ? "2.5rem" : "0.75rem"}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        color="gray.700"
        _placeholder={{ color: "gray.400" }}
        bg="gray.200"
        _hover={{ borderColor: "gray.500" }}
        _focus={{ borderColor: "#14CFB1", boxShadow: "0 0 0 1px #12CFB1" }}
        {...rest}
      />

      {iconType === "password" && (
        <Box
          position="absolute"
          top="50%"
          right="0.5rem"
          transform="translateY(-50%)"
          cursor="pointer"
          onClick={togglePasswordVisibility}
          zIndex={10}
          role="button"
          aria-label="Toggle password visibility"
          data-testid="toggle-password-visibility"
        >
          {showPassword ? (
            <ViewOffIcon color="gray.800" _hover={{ color: "#14CFB1" }} />
          ) : (
            <ViewIcon color="gray.800" _hover={{ color: "#14CFB1" }} />
          )}
        </Box>
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Box>
  );
};

export default InputField;
