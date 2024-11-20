"use client";

import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import Sidebar from "../../organisms/Sidebar";
import { RootState } from "@/app/store/store";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Flex direction="column" minH="100vh" bg="gray.100">
      <Header />
      <Flex flex="1">
        {isAuthenticated && <Sidebar />}
        <Box
          as="main"
          flex="1"
          mx="auto"
          role="main"
          bg="#FFF"
          boxShadow="sm"
          borderRadius="md"
        >
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
