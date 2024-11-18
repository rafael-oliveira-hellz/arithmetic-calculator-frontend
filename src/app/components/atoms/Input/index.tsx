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
          "w-full px-3 py-2 placeholder-gray-400 text-white bg-transparent border-gray-600 border rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "peer",
          sizeClasses[inputSize],
          className
        )}
        required={required}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
