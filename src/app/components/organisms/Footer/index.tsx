import { Flex } from "@chakra-ui/react";
import Text from "../../atoms/Text";
import { twclsx } from "@/app/utils/twclsx";

const Footer = ({ className }: { className?: string }) => (
  <Flex
    as="footer"
    className={twclsx("bg-gray-800 text-white p-4", className)}
    justify="center"
  >
    <Text>&copy; 2024 Arithmetic Calculator. All rights reserved.</Text>
  </Flex>
);

export default Footer;
