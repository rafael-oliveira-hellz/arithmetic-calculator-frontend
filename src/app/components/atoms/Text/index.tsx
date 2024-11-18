import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";
import { twclsx } from "@/app/utils/twclsx";

interface TextProps extends ChakraTextProps {
  variant?: "small" | "medium" | "large";
}

const Text: React.FC<TextProps> = ({
  variant = "medium",
  className,
  children,
  ...props
}): React.JSX.Element => {
  const variantClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-xl font-bold",
  };

  return (
    <ChakraText
      className={twclsx(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </ChakraText>
  );
};

Text.displayName = "Text";

export default Text;
