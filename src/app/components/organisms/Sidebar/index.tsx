"use client";

import React, { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { MdOutlineMenu, MdMenuOpen } from "react-icons/md";
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
      width={isExpanded ? "200px" : "60px"}
      minHeight="100vh"
      height="100%"
      role="navigation"
      transition="width 0.3s ease-in-out"
      aria-label="Sidebar"
      position="fixed"
      top="0"
      left="0"
      zIndex="999"
    >
      <Flex direction="column" h="full" align={isExpanded ? "start" : "center"}>
        <IconButton
          aria-label="Toggle Sidebar"
          aria-expanded={isExpanded ? "true" : "false"}
          onClick={() => setIsExpanded(!isExpanded)}
          bg="transparent"
          border="1px solid #14CFB1"
          m="2"
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
