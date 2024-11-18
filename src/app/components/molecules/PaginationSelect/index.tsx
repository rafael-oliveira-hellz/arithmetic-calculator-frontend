import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";

interface PaginationSelectProps {
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

const PaginationSelect: React.FC<PaginationSelectProps> = ({
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const itemsPerPageOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
  ];

  return (
    <FormControl>
      <FormLabel>Items Per Page</FormLabel>
      <Select
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        placeholder="Select items per page"
        size="sm"
        width="auto"
      >
        {itemsPerPageOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default PaginationSelect;
