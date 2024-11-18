"use client";

import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { RootState } from "@/app/store/store";
import HeaderContent from "../../molecules/HeaderContent";
import UserActions from "../../molecules/UserActions";
import { useAuthService } from "@/app/hooks/useAuthService";

const Header = () => {
  const { logoutUser } = useAuthService();
  const { isAuthenticated, user, balance } = useSelector(
    (state: RootState) => state.auth
  );

  return (
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
          balance={balance}
          onLogout={async () => await logoutUser()}
        />
      )}
    </Flex>
  );
};

export default Header;
