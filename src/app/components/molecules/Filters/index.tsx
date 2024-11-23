import React from "react";
import { Flex } from "@chakra-ui/react";
import FilterInput from "../FilterInput";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface FiltersProps {
  filters: {
    type: string;
    amount: string;
  };
  onFilterChange: (field: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const options = [
    { value: "ADDITION", label: "ADDITION", cost: 5 },
    { value: "SUBTRACTION", label: "SUBTRACTION", cost: 5 },
    { value: "MULTIPLICATION", label: "MULTIPLICATION", cost: 5 },
    { value: "DIVISION", label: "DIVISION", cost: 5 },
    { value: "SQUARE_ROOT", label: "SQUARE ROOT", cost: 5 },
    { value: "RANDOM_STRING", label: "RANDOM STRING", cost: 5 },
  ];

  const selectedLabel =
    options.find((option) => option.value === filters.type)?.label ||
    "Filter By Operation Type";

  return (
    <Flex gap="4" mb="4">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="gray.700"
          color="#FFF"
          _hover={{ bg: "gray.600" }}
          _active={{ bg: "gray.600" }}
          minW="250px"
          aria-label="Filter by operation type"
        >
          {selectedLabel}
        </MenuButton>
        <MenuList bg="gray.700" borderColor="gray.600">
          <MenuItem
            onClick={() => onFilterChange("type", "")}
            _hover={{ bg: "gray.600" }}
            bg="gray.700"
            color="#FFF"
            fontWeight="bold"
          >
            SHOW ALL
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => onFilterChange("type", option.value)}
              _hover={{ bg: "gray.600" }}
              bg="gray.700"
              color="#FFF"
            >
              {option.label} (Cost: {option.cost})
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <FilterInput
        placeholder="Filter By Operation Cost"
        value={filters.amount}
        onChange={(value) => onFilterChange("amount", value)}
      />
    </Flex>
  );
};

export default Filters;
