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
      bg="gray.800"
      color="#FFF"
      p="4"
      justify="center"
      align="center"
      width="100%"
      position="fixed"
      bottom="0"
      zIndex="1000"
      className={twclsx(className)}
    >
      <Text aria-label="Copyright" variant="large">
        &copy; {currentYear} Arithmetic Calculator. All rights reserved.
      </Text>
    </Flex>
  );
};

export default Footer;
