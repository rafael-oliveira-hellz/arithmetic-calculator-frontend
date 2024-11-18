"use client";

import { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { twclsx } from "@/app/utils/twclsx";
import SidebarContent from "../../molecules/SidebarContent";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      width={isExpanded ? "200px" : "60px"}
      className={twclsx("h-full")}
    >
      <Flex direction="column" h="full">
        <IconButton
          aria-label="Toggle Sidebar"
          onClick={() => setIsExpanded(!isExpanded)}
          className={twclsx("m-2")}
        >
          {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </IconButton>
        <SidebarContent isExpanded={isExpanded} />
      </Flex>
    </Box>
  );
};

export default Sidebar;
