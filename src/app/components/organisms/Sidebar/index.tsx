"use client";

import React, { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
import { twclsx } from "@/app/utils/twclsx";
import SidebarContent from "../../molecules/SidebarContent";

/**
 * A responsive sidebar component with toggle button.
 *
 * @returns {React.JSX.Element} A responsive sidebar component with toggle button.
 */
const Sidebar = (): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      as="nav"
      bg="gray.800"
      color="#FFF"
      width={{ base: "60px", md: isExpanded ? "200px" : "60px" }}
      className={twclsx("min-h-full")}
      role="navigation"
      transition="width 0.3s ease-in-out"
      aria-label="Sidebar"
    >
      <Flex direction="column" h="full" align={isExpanded ? "start" : "center"}>
        <IconButton
          aria-label="Toggle Sidebar"
          aria-expanded={isExpanded ? "true" : "false"}
          role="button"
          onClick={() => setIsExpanded(!isExpanded)}
          m="2"
          bg="transparent"
          border="1px solid #14CFB1"
        >
          {isExpanded ? (
            <MdMenuOpen fill="#14CFB1" size={40} data-icon="MdMenuOpen" />
          ) : (
            <MdOutlineMenu fill="#14CFB1" size={35} data-icon="MdOutlineMenu" />
          )}
        </IconButton>
        <SidebarContent isExpanded={isExpanded} />
      </Flex>
    </Box>
  );
};

export default Sidebar;
