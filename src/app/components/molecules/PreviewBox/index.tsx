import { Box } from "@chakra-ui/react";
import Text from "../../atoms/Text";

interface PreviewBoxProps {
  operation: string;
  value1: string;
  value2: string;
  requiresSecondInput: boolean;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({
  operation,
  value1,
  value2,
  requiresSecondInput,
}) => {
  return (
    <Box bg="gray.600" p="4" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
        Preview
      </Text>
      <Text fontSize="md" mb="2">
        <strong>Operação selecionada:</strong> {operation || "N/A"}
      </Text>
      <Text fontSize="md">
        <strong>Valor 1:</strong> {value1 || "N/A"}
      </Text>
      {requiresSecondInput && (
        <Text fontSize="md">
          <strong>Valor 2:</strong> {value2 || "N/A"}
        </Text>
      )}
    </Box>
  );
};

export default PreviewBox;
