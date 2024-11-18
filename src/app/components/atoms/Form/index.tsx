import { twclsx } from "@/app/utils/twclsx";
import React from "react";

interface FormAtomProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormAtomProps> = ({
  children,
  className,
  onSubmit,
  ...rest
}): React.JSX.Element => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form
      className={twclsx("space-y-4", className)}
      onSubmit={handleSubmit}
      {...rest}
    >
      {children}
    </form>
  );
};

Form.displayName = "Form";

export default Form;
