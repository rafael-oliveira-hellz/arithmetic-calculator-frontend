import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Option {
  id: string;
  type: string;
  cost: number;
}

interface OperationSelectProps {
  options: Option[]; // Lista de opções
  placeholder: string; // Placeholder do dropdown
  value: string; // Valor selecionado
  onChange: (value: string) => void; // Callback para mudança
}

const OperationSelect: React.FC<OperationSelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  const selectedLabel =
    options.find((option) => option.type === value)?.type || placeholder;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.600" }}
        _active={{ bg: "gray.600" }}
      >
        {selectedLabel}
      </MenuButton>
      <MenuList bg="gray.700" borderColor="gray.600">
        {options.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => onChange(option.type)}
            _hover={{ bg: "gray.600" }}
            bg="gray.700"
            color="white"
          >
            {option.type} (Custo: {option.cost})
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default OperationSelect;
