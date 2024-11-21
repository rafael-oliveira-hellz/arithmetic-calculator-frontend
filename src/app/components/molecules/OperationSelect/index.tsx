import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Option {
  id: string;
  type: string;
  cost: number;
}

interface OperationSelectProps {
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
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
        data-testid="operation-select"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={false}
        aria-label="Select an operation"
        rightIcon={<ChevronDownIcon />}
        bg="gray.700"
        color="#FFF"
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
            {option.type} (Cost: {option.cost})
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default OperationSelect;
