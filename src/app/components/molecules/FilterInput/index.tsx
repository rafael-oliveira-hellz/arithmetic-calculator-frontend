import React from "react";
import Input from "../../atoms/Input";

interface FilterInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  placeholder,
  value,
  onChange,
  ...props
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  );
};

export default FilterInput;
