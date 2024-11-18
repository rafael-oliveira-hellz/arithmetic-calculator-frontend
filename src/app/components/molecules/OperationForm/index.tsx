"use client";

import {
  Box,
  VStack,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface OperationFormProps {
  onSubmit: (type: string, operand1: number, operand2?: number) => void;
}

const OperationForm: React.FC<OperationFormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<string>("addition");
  const [operand1, setOperand1] = useState<number>(0);
  const [operand2, setOperand2] = useState<number | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(type, operand1, operand2);
  };

  const isSingleOperand = type === "square_root" || type === "random_string";

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      bg="gray.50"
    >
      <VStack gap={4}>
        <FormControl>
          <FormLabel>Operation Type</FormLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Select operation"
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
            <option value="square_root">Square Root</option>
            <option value="random_string">Random String</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Operand 1</FormLabel>
          <Input
            type="number"
            value={operand1}
            onChange={(e) => setOperand1(Number(e.target.value))}
            placeholder="Enter first operand"
          />
        </FormControl>
        {!isSingleOperand && (
          <FormControl>
            <FormLabel>Operand 2</FormLabel>
            <Input
              type="number"
              value={operand2}
              onChange={(e) => setOperand2(Number(e.target.value))}
              placeholder="Enter second operand"
            />
          </FormControl>
        )}
        <Button type="submit" colorScheme="blue" w="full">
          Perform Operation
        </Button>
      </VStack>
    </Box>
  );
};

export default OperationForm;
