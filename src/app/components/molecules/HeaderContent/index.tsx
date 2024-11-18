import { Flex } from "@chakra-ui/react";
import Logo from "../../atoms/Logo";
import Text from "../../atoms/Text";

interface HeaderContentProps {
  appName: string;
}

const HeaderContent = ({ appName }: HeaderContentProps): JSX.Element => (
  <Flex align="center" gap="4">
    <Logo text="Logo" />
    <Text variant="large" fontWeight="bold">
      {appName}
    </Text>
  </Flex>
);

export default HeaderContent;
