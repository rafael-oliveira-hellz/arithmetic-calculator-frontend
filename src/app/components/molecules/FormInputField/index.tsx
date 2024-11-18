import React from "react";
import InputField from "../InputField";
import { InputFieldConfig } from "@/shared/interfaces/input-field";

interface FormInputFieldProps {
  field: InputFieldConfig;
  className?: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  field,
  className,
}) => (
  <React.Fragment key={field.id}>
    <InputField
      id={field.id}
      value={field.value}
      onChange={field.onChange}
      iconType={field.iconType}
      placeholder={field.placeholder}
      isValid={field.isValid}
      errorMessage={field.errorMessage}
      onFocus={field.onFocus}
      onBlur={field.onBlur}
      className={className}
    />
    {field.showRules && field.rulesComponent}
  </React.Fragment>
);

export default FormInputField;
