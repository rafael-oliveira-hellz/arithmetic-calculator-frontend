import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { twclsx } from "@/app/utils/twclsx";
import Text from "../../atoms/Text";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  isExpanded: boolean;
  onClick: () => void;
  path: string;
}

const SidebarItem = ({
  icon,
  label,
  isExpanded,
  onClick,
  path,
}: SidebarItemProps): JSX.Element => {
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <Flex
      align="center"
      p="3"
      onClick={onClick}
      data-testid="sidebar-item"
      className={twclsx(
        "hover:bg-gray-700 cursor-pointer",
        isActive && "bg-gray-700 text-[#14CFB1]"
      )}
    >
      <Icon
        as={icon}
        fontSize="xl"
        role="img"
        aria-label={label}
        className={twclsx(
          isActive ? "text-[#14CFB1]" : "text-gray-400",
          "hover:text-[#14CFB1]"
        )}
      />
      {isExpanded && (
        <Text
          ml="3"
          fontSize="md"
          className={twclsx(isActive && "text-[#14CFB1]")}
        >
          {label}
        </Text>
      )}
    </Flex>
  );
};

export default SidebarItem;
