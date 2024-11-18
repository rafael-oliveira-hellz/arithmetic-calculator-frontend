import { chakra } from "@chakra-ui/react";
import { twclsx } from "@/app/utils/twclsx";
import React from "react";

export interface LabelAtomProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<LabelAtomProps> = ({
  className,
  children,
  ...rest
}): React.JSX.Element => {
  return (
    <chakra.label
      className={twclsx(
        "left-3 top-2 text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out",
        "transform origin-[0] scale-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-3 peer-placeholder-shown:left-3",
        "peer-focus:top-1 peer-focus:left-2 peer-focus:scale-75 peer-focus:text-blue-600",
        className
      )}
      {...rest}
    >
      {children}
    </chakra.label>
  );
};

Label.displayName = "Label";

export default Label;
