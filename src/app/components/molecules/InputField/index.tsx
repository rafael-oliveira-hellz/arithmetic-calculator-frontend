"use client";

import React, { useState } from "react";
import { Box, Input, InputProps } from "@chakra-ui/react";
import {
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  InfoIcon,
} from "@chakra-ui/icons";
import Text from "../../atoms/Text";

interface InputFieldProps extends Omit<InputProps, "onChange"> {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  iconType?: "name" | "email" | "password";
  isValid?: boolean;
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
  iconType,
  isValid,
  errorMessage,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputType =
    iconType === "password" && !showPassword ? "password" : "text";

  const LeftIcon = iconType && iconComponents[iconType];

  const borderColor =
    isValid === undefined ? "gray.300" : isValid ? "green.500" : "red.500";

  return (
    <Box mb={4} width="100%" position="relative">
      {LeftIcon && iconType && iconType !== "password" && (
        <Box
          position="absolute"
          top="50%"
          left="0.75rem"
          transform="translateY(-50%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          pointerEvents="none"
          zIndex={1}
        >
          <LeftIcon color="gray.600" />
        </Box>
      )}

      <Input
        id={id}
        value={value}
        type={inputType}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="on"
        pl="2.75rem"
        pr={iconType === "password" ? "2.5rem" : "0.75rem"}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="md"
        color="gray.800"
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
          zIndex={1}
        >
          {showPassword ? (
            <ViewOffIcon color="gray.600" />
          ) : (
            <ViewIcon color="gray.600" />
          )}
        </Box>
      )}

      {errorMessage && (
        <Text color="red.500" mt={1} fontSize="sm">
          {errorMessage}
        </Text>
      )}
    </Box>
  );
};

export default InputField;
