"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  GridItem,
  Spinner,
  Button,
  useToast,
} from "@chakra-ui/react";
import OperationSelect from "../../molecules/OperationSelect";
import PreviewBox from "../../molecules/PreviewBox";
import InputField from "../../molecules/InputField";
import { useOperationService } from "@/app/hooks/useOperationService";
import { mutate } from "swr";
import { ValidationService } from "@/app/services/validation-service";

const OperationsForm = ({
  balance,
}: {
  balance: number;
}): React.JSX.Element => {
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<{
    value1?: string;
    value2?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { performOperation, useOperations } = useOperationService();
  const { operations, error, isLoading } = useOperations();
  const toast = useToast();

  const validationService = useMemo(
    () => new ValidationService(balance),
    [balance]
  );

  const handleValidation = () => {
    const parsedValue1 = parseFloat(value1);
    const parsedValue2 = parseFloat(value2);

    const generalError = validationService.validateOperation(
      selectedOperation,
      parsedValue1,
      parsedValue2
    );

    setErrors((prev) => ({
      ...prev,
      general: generalError,
    }));

    if (generalError) {
      toast({
        title: "Validation Error",
        description: generalError,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const requiresTwoInputs = (operationType: string) =>
    ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"].includes(
      operationType
    );

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      key: "value1" | "value2"
    ) =>
    (value: string) => {
      setter(value);
      const error = validationService.validateInput(value);
      setErrors((prev) => ({
        ...prev,
        [key]: error,
      }));
      handleValidation();
    };

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

      await mutate("/records");

      toast({
        title: "Success",
        description: "Operation performed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error performing operation",
        description: `${error instanceof Error ? error.message : error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSelectedOperation("");
    setValue1("");
    setValue2("");
    setResult(undefined);
    setErrors({});
  };

  if (isLoading) {
    return (
      <Box p="6" textAlign="center">
        <Spinner size="lg" data-testid="spinner" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p="6" textAlign="center">
        <Text color="red.500">Failed to fetch operations</Text>
      </Box>
    );
  }

  return (
    <Box p="6" bg="gray.800" color="#FFF" borderRadius="md" shadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb="6" textAlign="center">
        Arithmetic Operations
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 1
          </Text>
          <OperationSelect
            options={operations}
            placeholder="Select an operation"
            value={selectedOperation}
            onChange={(value) => {
              resetState();
              setSelectedOperation(value);
            }}
          />
        </GridItem>

        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 2
          </Text>
          <VStack spacing="4">
            <InputField
              id="input-field-1"
              placeholder="Enter the first value"
              dataTestId="input-field-1"
              aria-invalid={!!errors.value1}
              value={value1}
              errorMessage={errors.value1}
              onChange={handleInputChange(setValue1, "value1")}
            />

            {requiresTwoInputs(selectedOperation) && (
              <InputField
                id="input-field-2"
                placeholder="Enter the second value"
                dataTestId="input-field-2"
                aria-invalid={!!errors.value2}
                value={value2}
                errorMessage={errors.value2}
                onChange={handleInputChange(setValue2, "value2")}
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
                Result: {result}
              </Text>
            )}

            {errors.general && (
              <Text
                role="alert"
                data-testid="error-message"
                color="red.400"
                fontWeight="bold"
                aria-label={errors.general}
              >
                {errors.general}
              </Text>
            )}

            <Button
              bg="#14CFB1"
              color="#FFF"
              _hover={{ bg: "#12B49C" }}
              size="lg"
              onClick={handleSubmit}
              isDisabled={
                !selectedOperation ||
                !!errors.value1 ||
                !!errors.value2 ||
                !!errors.general ||
                loading
              }
            >
              {loading ? <Spinner size="md" /> : "Perform Operation"}
            </Button>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default OperationsForm;
