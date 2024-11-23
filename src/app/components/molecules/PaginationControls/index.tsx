import React from "react";
import { Flex } from "@chakra-ui/react";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  const isSinglePage = totalPages === 1;
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <Flex justify="space-evenly" alignItems="center" mt="4">
      <Button
        onClick={onPrevious}
        disabled={isFirst || isSinglePage}
        aria-disabled={isFirst || isSinglePage}
        colorScheme={isFirst || isSinglePage ? "gray" : "#14CFB1"}
      >
        Previous Page
      </Button>
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        onClick={onNext}
        disabled={isLast || isSinglePage}
        aria-disabled={isLast || isSinglePage}
        colorScheme={isLast || isSinglePage ? "gray" : "#14CFB1"}
      >
        Next Page
      </Button>
    </Flex>
  );
};

export default PaginationControls;
