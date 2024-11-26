import { Flex } from "@chakra-ui/react";
import Text from "../../atoms/Text";
import { twclsx } from "@/app/utils/twclsx";

/**
 * Footer component, containing the copyright information.
 *
 * @example
 * <Footer />
 *
 * @param {string} [className] - Additional CSS class names to apply to the component.
 *
 * @returns {React.JSX.Element} The rendered Footer component.
 */
const Footer = ({ className }: { className?: string }): React.JSX.Element => {
  const currentYear = new Date().getFullYear();
  return (
    <Flex
      as="footer"
      aria-label="Footer"
      role="contentinfo"
      className={twclsx("bg-gray-800 text-white p-4", className)}
      p="4"
      justify="center"
      align="center"
      textAlign="center"
      flexDirection={{ base: "column", md: "row" }} // Coluna em telas menores
    >
      <Text aria-label="Copyright" aria-description="Copyright" variant="large">
        &copy; {currentYear} Arithmetic Calculator. All rights reserved.
      </Text>
    </Flex>
  );
};

export default Footer;
