import { twclsx } from "@/app/utils/twclsx";
import React from "react";
import Text from "../Text";

interface ErrorMessageAtomProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageAtomProps> = ({
  children,
  className,
  ...rest
}): React.JSX.Element => {
  return (
    <Text
      aria-label="Error Message"
      role="alert"
      data-testid="error-message"
      className={twclsx("text-red-500 text-sm", className)}
      {...rest}
    >
      {children}
    </Text>
  );
};

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
