import React from "react";
import { Heading } from "@chakra-ui/react";

interface FormHeaderProps {
  title: string;
  className?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  className,
}): React.JSX.Element => {
  return (
    <Heading textAlign="center" fontSize={"2xl"} className={className}>
      {title}
    </Heading>
  );
};

FormHeader.displayName = "FormHeader";

export default FormHeader;
