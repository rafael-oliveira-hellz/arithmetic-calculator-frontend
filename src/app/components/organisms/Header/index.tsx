"use client";

import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { RootState } from "@/app/store/store";
import HeaderContent from "../../molecules/HeaderContent";
import UserActions from "../../molecules/UserActions";
import { useAuthService } from "@/app/hooks/useAuthService";
import React from "react";

/**
 * The Header component renders the header of the application with
 * a banner containing the app name and the user actions if the
 * user is authenticated.
 *
 * @returns The Header component.
 */
const Header = (): React.JSX.Element => {
  const { logoutUser } = useAuthService();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <>
      <Flex
        as="header"
        role="banner"
        justify="space-between"
        align="center"
        p="4"
        bg="gray.800"
        color="#FFF"
      >
        <HeaderContent appName="Arithmetic Calculator" />
        {isAuthenticated && (
          <UserActions
            data-testid="user-actions"
            username={user?.username ?? "Guest"}
            onLogout={async () => await logoutUser()}
          />
        )}
      </Flex>
    </>
  );
};

export default Header;
