import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { twclsx } from "@/app/utils/twclsx";
import React, { forwardRef } from "react";

export interface InputAtomProps extends Omit<ChakraInputProps, "size"> {
  className?: string;
  inputSize?: "sm" | "md" | "lg";
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputAtomProps>(
  (
    { className, inputSize = "md", required, ...rest },
    ref
  ): React.JSX.Element => {
    const sizeClasses = {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    return (
      <ChakraInput
        ref={ref}
        className={twclsx(
          "w-full px-3 py-2 placeholder-gray-400 text-gray-200 bg-gray-700 border-gray-600 border rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-[#14CFB1]",
          sizeClasses[inputSize],
          className
        )}
        required={required}
        color="gray.200"
        _placeholder={{ color: "gray.400" }}
        _hover={{ borderColor: "gray.500" }}
        _focus={{
          borderColor: "#14CFB1",
          boxShadow: "0 0 0 2px #14CFB1",
        }}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
