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
  return (
    <Flex justify="space-between" alignItems="center" mt="4">
      <Button onClick={onPrevious} isDisabled={currentPage === 0}>
        Página Anterior
      </Button>
      <Text>
        Página {currentPage + 1} de {totalPages}
      </Text>
      <Button onClick={onNext} isDisabled={currentPage + 1 >= totalPages}>
        Próxima Página
      </Button>
    </Flex>
  );
};

export default PaginationControls;
