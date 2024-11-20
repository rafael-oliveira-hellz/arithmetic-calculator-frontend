import React from "react";
import Text from "../../atoms/Text";
import { FiLogOut } from "react-icons/fi";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { UserActionsProps } from "@/shared/interfaces/user-actions-props";

const UserActions = ({ username, onLogout }: UserActionsProps): JSX.Element => (
  <Flex align="center" gap="4">
    <Text variant="large">Welcome, {username}</Text>
    <Tooltip
      label="Logout"
      aria-label="Logout tooltip"
      placement="bottom"
      hasArrow
    >
      <IconButton
        aria-label="Logout"
        icon={<FiLogOut />}
        onClick={onLogout}
        bg="#14CFB1"
        color="#FFF"
        _hover={{ bg: "#12B49C" }}
        variant="solid"
      />
    </Tooltip>
  </Flex>
);

export default UserActions;
