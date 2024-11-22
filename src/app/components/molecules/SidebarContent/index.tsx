"use client";

import { useRouter } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { menuItems } from "../../config/menu-items";
import { Box } from "@chakra-ui/react";

interface SidebarContentProps {
  isExpanded: boolean;
}

const SidebarContent = ({ isExpanded }: SidebarContentProps) => {
  const router = useRouter();

  return (
    <Box className="flex flex-col justify-evenly">
      {menuItems.map((item) => (
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isExpanded={isExpanded}
          onClick={() => router.push(item.path)}
          path={item.path}
        />
      ))}
    </Box>
  );
};

export default SidebarContent;
