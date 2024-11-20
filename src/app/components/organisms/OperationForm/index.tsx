"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  Spinner,
  Button,
} from "@chakra-ui/react";
import OperationSelect from "../../molecules/OperationSelect";
import PreviewBox from "../../molecules/PreviewBox";
import { Operation } from "@/shared/interfaces/operations";
import InputField from "../../molecules/InputField";
import { v4 } from "uuid";
import { useOperationService } from "@/app/hooks/useOperationService";

const OperationsForm = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { fetchOperations, performOperation } = useOperationService();

  useEffect(() => {
    const fetchInitialOperations = async () => {
      try {
        const result = await fetchOperations();
        setOperations(result);
      } catch (error) {
        console.error("Failed to fetch operations:", error);
      }
    };

    fetchInitialOperations();
  }, [fetchOperations]);

  const requiresTwoInputs = (operationType: string) =>
    ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"].includes(
      operationType
    );

  const validateInput = (value: string) =>
    /^\d*\.?\d*$/.test(value)
      ? undefined
      : "Apenas valores numéricos são permitidos.";

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      value1: parseFloat(value1),
      value2: requiresTwoInputs(selectedOperation)
        ? parseFloat(value2)
        : undefined,
    };

    try {
      const operationResult = await performOperation(
        selectedOperation.toLowerCase(),
        payload
      );
      setResult(operationResult?.operationResponse);
    } catch (error) {
      console.error("Erro ao realizar a operação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="6" bg="gray.800" color="white" borderRadius="md" shadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb="6" textAlign="center">
        Operações Matemáticas
      </Text>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 1
          </Text>
          <OperationSelect
            options={operations}
            placeholder="Selecione uma operação"
            value={selectedOperation}
            onChange={(value) => {
              setSelectedOperation(value);
              setValue1("");
              setValue2("");
              setResult(undefined);
            }}
          />
        </GridItem>

        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 2
          </Text>
          <VStack spacing="4">
            <InputField
              id={v4()}
              placeholder="Digite o primeiro valor"
              value={value1}
              errorMessage={errors}
              onChange={(value) => {
                setValue1(value);
                setErrors(validateInput(value));
              }}
            />
            {requiresTwoInputs(selectedOperation) && (
              <InputField
                id={v4()}
                placeholder="Digite o segundo valor"
                value={value2}
                errorMessage={errors}
                onChange={(value) => {
                  setValue2(value);
                  setErrors(validateInput(value));
                }}
              />
            )}
          </VStack>
        </GridItem>

        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 3
          </Text>
          <VStack spacing="4">
            <PreviewBox
              operation={selectedOperation}
              value1={value1}
              value2={value2}
              requiresSecondInput={requiresTwoInputs(selectedOperation)}
            />

            {result && (
              <Text fontSize="lg" fontWeight="bold" textAlign="center" my={6}>
                Resultado: {result}
              </Text>
            )}

            <Button
              bg="#14CFB1"
              color="#FFF"
              _hover={{ bg: "#12B49C" }}
              size="lg"
              onClick={handleSubmit}
              isDisabled={!selectedOperation || !!errors}
            >
              {loading ? <Spinner size="md" /> : "Realizar Operação"}
            </Button>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default OperationsForm;
