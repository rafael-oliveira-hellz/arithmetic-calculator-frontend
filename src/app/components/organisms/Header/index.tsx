"use client";

import { useSelector } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";
import { RootState } from "@/app/store/store";
import HeaderContent from "../../molecules/HeaderContent";
import UserActions from "../../molecules/UserActions";
import { useAuthService } from "@/app/hooks/useAuthService";
import { useState } from "react";
import Spinner from "../../molecules/Spinner";

const Header = () => {
  const { logoutUser } = useAuthService();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <Flex
        as="header"
        justify="space-between"
        align="center"
        p="4"
        bg="gray.800"
        color="white"
      >
        <HeaderContent appName="Arithmetic Calculator" />
        {isAuthenticated && (
          <UserActions
            username={user?.username ?? "Guest"}
            onLogout={async () => {
              try {
                setIsLoading(true);
                await logoutUser();
                setIsLoading(false);
              } catch (error) {
                console.error(error);
              } finally {
                setIsLoading(false);
              }
            }}
          />
        )}
      </Flex>
      {isLoading && (
        <Box className="absolute flex justify-center items-center bg-[#00000070] w-full h-full top-0 bottom-0 right-0 left-0 z-40">
          {/* <Spinner className='absolute border border-red-800 top-1/2 bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50' /> */}
          <Spinner className="relative z-50" width="50px" height="50px" />
        </Box>
      )}
    </>
  );
};

export default Header;
