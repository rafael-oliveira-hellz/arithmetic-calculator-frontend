import { twclsx } from "@/app/utils/twclsx";
import React from "react";

export interface FormControlAtomProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FormControl: React.FC<FormControlAtomProps> = ({
  className,
  children,
  ...rest
}): React.JSX.Element => {
  return (
    <div className={twclsx("relative mt-4", className)} {...rest}>
      {children}
    </div>
  );
};

FormControl.displayName = "FormControl";

export default FormControl;
