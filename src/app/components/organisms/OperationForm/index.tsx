import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import OperationSelect from "../../molecules/OperationSelect";
import { useAuthService } from "@/app/hooks/useAuthService";
import { Record } from "@/shared/interfaces/record";

interface Operation {
  id: string;
  type: string;
  cost: number;
}

const OperationsForm = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<Record | null>();
  const [errorValue1, setErrorValue1] = useState<string | null>(null);
  const [errorValue2, setErrorValue2] = useState<string | null>(null);

  const { performOperation } = useAuthService();

  useEffect(() => {
    const mockOperations = [
      { id: "1", type: "ADDITION", cost: 5 },
      { id: "2", type: "SUBTRACTION", cost: 5 },
      { id: "3", type: "MULTIPLICATION", cost: 5 },
      { id: "4", type: "DIVISION", cost: 5 },
      { id: "5", type: "SQUARE_ROOT", cost: 5 },
      { id: "6", type: "RANDOM_STRING", cost: 5 },
    ];
    setOperations(mockOperations);
  }, []);

  const handleSubmit = async () => {
    if (
      !selectedOperation ||
      !value1 ||
      (requiresTwoInputs(selectedOperation) && !value2)
    ) {
      alert("Preencha todos os campos necessários!");
      return;
    }

    const payload = {
      value1: parseFloat(value1),
      value2: requiresTwoInputs(selectedOperation)
        ? parseFloat(value2)
        : undefined,
    };

    try {
      const result = await performOperation(
        selectedOperation.toLowerCase(),
        payload
      );
      console.log("Resultado da Operação:", result);
    } catch (error) {
      console.error("Erro ao realizar a operação:", error);
    }
  };

  const requiresTwoInputs = (operationType: string) => {
    return ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"].includes(
      operationType
    );
  };

  const validateInput = (
    value: string,
    setError: (error: string | null) => void
  ) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Apenas valores numéricos são permitidos.");
    } else {
      setError(null);
    }
  };

  return (
    <Box p="6" bg="gray.800" color="white" borderRadius="md" shadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb="6" textAlign="center">
        Operações Matemáticas
      </Text>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {/* STEP 1 */}
        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 1
          </Text>
          <FormControl>
            <FormLabel>Menu de Seleção de Tipo de Operações</FormLabel>
            <OperationSelect
              options={operations}
              placeholder="Selecione uma operação"
              value={selectedOperation}
              onChange={(value) => {
                setSelectedOperation(value);
                setValue1(""); // Limpa o valor 1
                setValue2(""); // Limpa o valor 2
                setResult(null); // Reseta o resultado
              }}
            />
          </FormControl>
        </GridItem>

        {/* STEP 2 */}
        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 2
          </Text>
          <VStack spacing="4">
            {selectedOperation && (
              <>
                <FormControl>
                  <FormLabel>Digite o primeiro valor</FormLabel>
                  <Input
                    placeholder="Valor 1"
                    type="text"
                    value={value1}
                    onChange={(e) => {
                      const value = e.target.value;
                      setValue1(value);
                      validateInput(value, setErrorValue1);
                    }}
                  />
                  {errorValue1 && (
                    <FormErrorMessage>{errorValue1}</FormErrorMessage>
                  )}
                </FormControl>
                {requiresTwoInputs(selectedOperation) && (
                  <FormControl>
                    <FormLabel>Digite o segundo valor</FormLabel>
                    <Input
                      placeholder="Valor 2"
                      type="text"
                      value={value2}
                      onChange={(e) => {
                        const value = e.target.value;
                        setValue2(value);
                        validateInput(value, setErrorValue2);
                      }}
                    />
                    {errorValue2 && (
                      <FormErrorMessage>{errorValue2}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </>
            )}
            {!selectedOperation && (
              <Text color="gray.400" textAlign="center">
                Selecione uma operação no STEP 1 para continuar.
              </Text>
            )}
          </VStack>
        </GridItem>

        {/* STEP 3 */}
        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 3
          </Text>
          <VStack spacing="4">
            <Box bg="gray.600" p="4" borderRadius="md">
              <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
                Preview
              </Text>
              <Text fontSize="md" mb="2">
                <strong>Operação selecionada:</strong>{" "}
                {selectedOperation || "N/A"}
              </Text>
              <Text fontSize="md">
                <strong>Valor 1:</strong>{" "}
                {errorValue1 ? "N/A" : value1 || "N/A"}
              </Text>
              {requiresTwoInputs(selectedOperation) && (
                <Text fontSize="md">
                  <strong>Valor 2:</strong>{" "}
                  {errorValue2 ? "N/A" : value2 || "N/A"}
                </Text>
              )}
            </Box>
            <Button
              bg="#14CFB1"
              color="#FFF"
              _hover={{ bg: "#12B49C" }}
              variant="solid"
              size="lg"
              onClick={handleSubmit}
              isDisabled={!selectedOperation || !!errorValue1 || !!errorValue2}
            >
              Realizar Operação
            </Button>
            {result && (
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                Resultado: {result.operationResponse}
              </Text>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default OperationsForm;
