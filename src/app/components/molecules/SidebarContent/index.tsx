"use client";

import { useRouter } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { menuItems } from "../../config/menu-items";

interface SidebarContentProps {
  isExpanded: boolean;
}

const SidebarContent = ({ isExpanded }: SidebarContentProps) => {
  const router = useRouter();

  return (
    <div>
      {menuItems.map((item) => (
        <SidebarItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          isExpanded={isExpanded}
          onClick={() => router.push(item.path)}
        />
      ))}
    </div>
  );
};

export default SidebarContent;
