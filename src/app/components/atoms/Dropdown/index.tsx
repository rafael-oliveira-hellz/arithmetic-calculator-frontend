import React from "react";
import { Select, SelectProps, FormControl } from "@chakra-ui/react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends Omit<SelectProps, "onChange"> {
  options: DropdownOption[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder,
  onChange,
  ...rest
}) => {
  return (
    <FormControl>
      <Select
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        bg="gray.700"
        color="#FFF"
        border="1px solid"
        borderColor="gray.600"
        _hover={{ borderColor: "gray.500" }}
        _focus={{ borderColor: "#14CFB1", boxShadow: "0 0 0 1px #14CFB1" }}
        {...rest}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{ color: "black" }}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
