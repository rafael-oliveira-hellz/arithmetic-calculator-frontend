import React from "react";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import { Flex, Box } from "@chakra-ui/react";

interface UserActionsProps {
  username: string;
  balance: number;
  onLogout: () => void;
}

const UserActions = ({
  username,
  balance,
  onLogout,
}: UserActionsProps): JSX.Element => (
  <Flex align="center" gap="4">
    <Text>{username}</Text>
    <Box>
      <Text color="gray.200">Balance:</Text>
      <Text color="green.400" fontWeight="bold">
        {balance}
      </Text>
    </Box>
    <Button buttonType="danger" onClick={onLogout}>
      Logout
    </Button>
  </Flex>
);

export default UserActions;
