import {
  ButtonProps as ChakraButtonProps,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { twclsx } from "@/app/utils/twclsx";
import { useMemo } from "react";
import Spinner from "../../molecules/Spinner";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ChakraButtonProps {
  buttonType?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonType = "primary",
  size = "md",
  className,
  isLoading = false,
  isDisabled = false,
  children,
  ...props
}): React.JSX.Element => {
  const variantClasses: Record<ButtonVariant, string> = useMemo(
    () => ({
      primary: "bg-[#14CFB1] hover:bg-[#12B89E] text-white rounded-md",
      secondary: "bg-gray-600 hover:bg-gray-500 text-white rounded-md",
      danger: "bg-red-500 hover:bg-red-600 text-white rounded-md",
    }),
    []
  );

  const sizeClasses = useMemo(
    () => ({
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }),
    []
  );

  console.log(isLoading, isDisabled);

  return (
    <ChakraButton
      className={twclsx(
        variantClasses[buttonType],
        sizeClasses[size],
        className
      )}
      disabled={isLoading || isDisabled}
      style={{ position: "relative" }}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </ChakraButton>
  );
};

Button.displayName = "Button";

export default Button;
