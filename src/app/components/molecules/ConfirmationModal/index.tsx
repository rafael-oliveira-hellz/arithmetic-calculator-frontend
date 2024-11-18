import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg="blackAlpha.600"
      zIndex={10}
    >
      <Flex align="center" justify="center" w="100%" h="100%" p={4}>
        <Box
          bg="#FFF"
          borderRadius="md"
          shadow="lg"
          maxW="400px"
          w="100%"
          p={6}
        >
          <Text fontSize="lg" mb={4} fontWeight="bold">
            Confirm Action
          </Text>
          <Text mb={6}>{message}</Text>
          <Flex justify="flex-end" gap={2}>
            <Button colorScheme="red.500" onClick={onConfirm}>
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ConfirmationModal;
