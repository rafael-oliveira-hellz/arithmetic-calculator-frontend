"use client";

import { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
import { twclsx } from "@/app/utils/twclsx";
import SidebarContent from "../../molecules/SidebarContent";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      width={isExpanded ? "200px" : "60px"}
      className={twclsx("min-h-full")}
      aria-expanded={isExpanded}
      transition="width 0.3s ease-in-out"
    >
      <Flex direction="column" h="full" align={isExpanded ? "start" : "center"}>
        <IconButton
          aria-label="Toggle Sidebar"
          onClick={() => setIsExpanded(!isExpanded)}
          className={twclsx("m-2")}
          style={{
            background: "transparent",
            border: "1px solid #14CFB1",
          }}
        >
          {isExpanded ? (
            <MdMenuOpen fill="#14CFB1" size={40} />
          ) : (
            <MdOutlineMenu fill="#14CFB1" size={35} />
          )}
        </IconButton>
        <SidebarContent isExpanded={isExpanded} />
      </Flex>
    </Box>
  );
};

export default Sidebar;
