import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { twclsx } from "@/app/utils/twclsx";
import Text from "../../atoms/Text";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  isExpanded: boolean;
  onClick: () => void;
}

const SidebarItem = ({
  icon,
  label,
  isExpanded,
  onClick,
}: SidebarItemProps): JSX.Element => (
  <Flex
    align="center"
    p="3"
    className={twclsx("hover:bg-gray-700 cursor-pointer")}
    onClick={onClick}
    data-testid="sidebar-item"
  >
    <Icon
      as={icon}
      fontSize="xl"
      role="img"
      aria-label={label}
      className={twclsx("hover:text-[#14CFB1] transition-colors duration-200")}
    />
    {isExpanded && (
      <Text ml="3" fontSize="md">
        {label}
      </Text>
    )}
  </Flex>
);

export default SidebarItem;
