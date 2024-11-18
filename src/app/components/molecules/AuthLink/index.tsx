import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

interface AuthLinkProps {
  preText: string;
  text: string;
  href: string;
}

const AuthLink: React.FC<AuthLinkProps> = ({
  preText,
  text,
  href,
}): React.JSX.Element => {
  return (
    <Box mt={4} textAlign="center">
      <Text color="gray.600">
        {preText}
        <Link href={href} passHref>
          <Text
            as="span"
            color="blue.600"
            fontWeight="bold"
            cursor="pointer"
            position="relative"
            ml={3}
            _hover={{
              color: "blue.700",
              "&::after": {
                width: "100%",
              },
            }}
            transition="color 0.3s"
            _after={{
              content: '""',
              position: "absolute",
              height: "2px",
              width: "0",
              bottom: "-2px",
              left: "0",
              bg: "blue.600",
              transition: "width 0.3s ease",
            }}
          >
            {text}
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default AuthLink;
