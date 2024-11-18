import { twclsx } from "@/app/utils/twclsx";
import { Box } from "@chakra-ui/react";
import NextLink from "next/link";
import Text from "../Text";

interface LogoProps {
  text: string;
  fontSize?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({
  text,
  fontSize = "xl",
  color = "white",
}): React.JSX.Element => (
  <Box className="font-bold">
    <NextLink
      href="/"
      passHref
      aria-label="Página inicial"
      className={twclsx("flex items-center")}
    >
      <Text as="span" variant="large" fontSize={fontSize} color={color}>
        {text}
      </Text>
    </NextLink>
  </Box>
);

Logo.displayName = "Logo";

export default Logo;
