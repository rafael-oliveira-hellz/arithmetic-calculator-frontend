import React from "react";
import { Flex } from "@chakra-ui/react";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}) => {
  return (
    <Flex justify="space-between" alignItems="center" mt="4">
      <Button
        onClick={onPrevious}
        disabled={isFirst}
        colorScheme={isFirst ? "gray" : "blue"}
      >
        Last Page
      </Button>
      <Text>
        Página {currentPage + 1} de {totalPages}
      </Text>
      <Button
        onClick={onNext}
        disabled={isLast}
        colorScheme={isLast ? "gray" : "blue"}
      >
        Next Page
      </Button>
    </Flex>
  );
};

export default PaginationControls;
