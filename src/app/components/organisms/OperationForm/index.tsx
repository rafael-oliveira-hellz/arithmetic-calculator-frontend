"use client";

import React, { useState } from "react";
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

/**
 * Renders a form to perform arithmetic operations.
 *
 * The OperationsForm component allows users to select an arithmetic operation
 * (addition, subtraction, multiplication, division) from a dropdown menu and
 * input one or two numeric values depending on the selected operation.
 * It validates the inputs to ensure they are numeric, displays a preview of
 * the operation, and performs the operation upon submission. The result is
 * shown to the user, and errors (if any) are displayed using a toast notification.
 *
 * State:
 * - selectedOperation: The currently selected arithmetic operation.
 * - value1: The first numeric input value.
 * - value2: The second numeric input value, required for some operations.
 * - result: The result of the performed operation.
 * - errors: Validation errors for the numeric inputs.
 * - loading: Indicates if the operation is being performed.
 *
 * Hooks:
 * - useOperationService: Provides methods to fetch operations and perform them.
 * - useToast: Displays toast notifications for success or error messages.
 *
 * UI:
 * - Displays a grid layout with steps to select an operation, input values,
 *   preview the operation, and perform the operation.
 * - Contains a loading spinner and error handling.
 */
const OperationsForm = (): React.JSX.Element => {
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<{ value1?: string; value2?: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  const { performOperation, useOperations } = useOperationService();
  const { operations, error, isLoading } = useOperations();
  const toast = useToast();

  const requiresTwoInputs = (operationType: string) =>
    ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"].includes(
      operationType
    );

  const validateInput = (value: string) =>
    /^\d*\.?\d*$/.test(value) ? undefined : "Only numeric values are allowed.";

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

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem bg="gray.700" p="4" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            STEP 1
          </Text>
          <OperationSelect
            options={operations}
            placeholder="Select an operation"
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
              id="input-field-1"
              placeholder="Enter the first value"
              dataTestId="input-field-1"
              aria-invalid={!!errors.value1}
              value={value1}
              errorMessage={errors.value1}
              onChange={(value) => {
                setValue1(value);
                setErrors((prev) => ({
                  ...prev,
                  value1: validateInput(value),
                }));
              }}
            />

            {requiresTwoInputs(selectedOperation) && (
              <InputField
                id="input-field-2"
                placeholder="Enter the second value"
                dataTestId="input-field-2"
                aria-invalid={!!errors.value2}
                value={value2}
                errorMessage={errors.value2}
                onChange={(value) => {
                  setValue2(value);
                  setErrors((prev) => ({
                    ...prev,
                    value2: validateInput(value),
                  }));
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
                Result: {result}
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
