import { Input, Box } from "@chakra-ui/react";

interface DataTableFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DataTableFilter: React.FC<DataTableFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <Box mb={4}>
      <Input
        placeholder="Filter by operation response"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
};

export default DataTableFilter;
