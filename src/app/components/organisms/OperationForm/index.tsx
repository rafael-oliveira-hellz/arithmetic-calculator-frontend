"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
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
import Text from "../../atoms/Text";
import {
  Errors,
  OperationsFormProps,
  Option,
} from "@/shared/interfaces/operations";
import { Record } from "@/shared/interfaces/records";
import { cache } from "swr/_internal";

const OperationsForm = ({
  balance,
}: OperationsFormProps): React.JSX.Element => {
  const [selectedOperation, setSelectedOperation] = useState<Option | null>(
    null
  );
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<Record | undefined>(undefined);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { performOperation, useOperations } = useOperationService();
  const { operations, error, isLoading } = useOperations();
  const toast = useToast();

  const validationService = useMemo(
    () => new ValidationService(balance),
    [balance]
  );

  const getCachedRecords = useCallback(() => {
    return cache.get("/records") as Record | undefined;
  }, []);

  const cachedRecords = useMemo(() => getCachedRecords(), [getCachedRecords]);

  useEffect(() => {
    if (cachedRecords) {
      setResult((prevResult) => prevResult || cachedRecords);
    }
  }, [cachedRecords]);

  const requiresTwoInputs = useMemo(
    () => (operationType: string | undefined) =>
      ["ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"].includes(
        operationType || ""
      ),
    []
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

  const handleValidation = () => {
    const parsedValue1 = parseFloat(value1);
    const parsedValue2 = parseFloat(value2);

    const generalError = validationService.validateOperation(
      selectedOperation?.type || "",
      parsedValue1,
      parsedValue2,
      selectedOperation?.cost
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
        position: "top-right",
      });
    }

    return generalError;
  };

  const isFormValid = (): boolean => {
    if (!selectedOperation) return false;
    if (!!errors.value1 || !!errors.value2 || !!errors.general) return false;
    if (loading) return false;
    if (requiresTwoInputs(selectedOperation.type)) {
      return !!value1 && !!value2;
    }
    return !!value1;
  };

  const handleSubmit = async () => {
    const validationError = handleValidation();

    if (validationError) {
      return;
    }

    setLoading(true);

    const payload = {
      value1: parseFloat(value1),
      value2: requiresTwoInputs(selectedOperation?.type || "")
        ? parseFloat(value2)
        : undefined,
    };

    try {
      const operationResult = await performOperation(
        (selectedOperation?.type || "").toLowerCase(),
        payload
      );

      setResult(operationResult);
      await mutate("/records", operationResult, false);
    } catch (error) {
      toast({
        title: "Error performing operation",
        description: `${error instanceof Error ? error.message : error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSelectedOperation(null);
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

  console.log(cache.get("/records"));

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
            value={selectedOperation?.type || ""}
            onChange={(option) => {
              resetState();
              setSelectedOperation(option);
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
              aria-label="Enter the first value"
              placeholder="Enter the first value"
              dataTestId="input-field-1"
              aria-invalid={!!errors.value1}
              value={value1}
              errorMessage={errors.value1}
              onChange={handleInputChange(setValue1, "value1")}
            />

            {selectedOperation &&
              requiresTwoInputs(selectedOperation!.type) && (
                <InputField
                  id="input-field-2"
                  aria-label="Enter the second value"
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
              operation={selectedOperation?.type || ""}
              value1={value1}
              value2={value2}
              requiresSecondInput={
                selectedOperation
                  ? requiresTwoInputs(selectedOperation.type)
                  : false
              }
            />

            {result && (
              <Text fontSize="lg" fontWeight="bold" textAlign="center" my={6}>
                Result: {result.operationResponse}
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
              isDisabled={!isFormValid() || loading}
              width="100%"
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
