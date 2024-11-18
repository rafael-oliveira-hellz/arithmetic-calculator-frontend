import { twclsx } from "@/app/utils/twclsx";
import React from "react";

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
    <div className={twclsx("text-red-500 text-sm", className)} {...rest}>
      {children}
    </div>
  );
};

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
