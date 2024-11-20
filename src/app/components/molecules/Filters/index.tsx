import React from "react";
import { Flex } from "@chakra-ui/react";
import Dropdown from "../../atoms/Dropdown";
import FilterInput from "../FilterInput";

interface FiltersProps {
  filters: {
    type: string;
    amount: string;
  };
  onFilterChange: (field: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <Flex gap="4" mb="4">
      <Dropdown
        placeholder="Filtrar por Tipo"
        options={[
          { value: "ADDITION", label: "ADDITION" },
          { value: "SUBTRACTION", label: "SUBTRACTION" },
          { value: "MULTIPLICATION", label: "MULTIPLICATION" },
          { value: "DIVISION", label: "DIVISION" },
          { value: "SQUARE_ROOT", label: "SQUARE ROOT" },
          { value: "RANDOM_STRING", label: "RANDOM STRING" },
        ]}
        value={filters.type}
        onChange={(value) => onFilterChange("type", value)}
      />
      <FilterInput
        placeholder="Filtrar por Valor"
        value={filters.amount}
        onChange={(value) => onFilterChange("amount", value)}
      />
    </Flex>
  );
};

export default Filters;
