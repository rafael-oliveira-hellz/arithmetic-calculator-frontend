import React from "react";
import { Select } from "@chakra-ui/react";

interface DropdownProps {
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  value,
  onChange,
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      bg="gray.700" // Fundo do dropdown
      color="white" // Cor do texto
      _hover={{ bg: "gray.600" }} // Fundo ao passar o mouse
      border="1px solid"
      borderColor="gray.600"
      _placeholder={{
        color: "gray.400", // Cor do placeholder
      }}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          style={{
            backgroundColor: "#1A202C", // Fundo escuro para as opções
            color: "white", // Texto branco para contraste
          }}
        >
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default Dropdown;
