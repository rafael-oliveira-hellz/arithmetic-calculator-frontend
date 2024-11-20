"use client";

import React, { useEffect, useRef, useState } from "react";
import Form from "../../atoms/Form";
import { Box } from "@chakra-ui/react";
import Button from "../../atoms/Button";
import { RegisterFormProps } from "@/shared/interfaces/register-props";
import { getInputFieldsConfig } from "@/app/utils/input-field-config";
import FormInputField from "../FormInputField";
import AuthLink from "../AuthLink";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && !email.includes(" ");
};

const validatePassword = (password: string): boolean => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  return (
    hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar
  );
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  password,
  confirmPassword,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  emailErrorMessage,
  isFormValid,
  isLoading = false,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [showRules, setShowRules] = useState({ email: false, password: false });
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  const handleBlur = (
    field: "name" | "email" | "password" | "confirmPassword"
  ) => {
    console.log(`Campo tocado: ${field}`);
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const inputFields = getInputFieldsConfig(
    name,
    email,
    password,
    confirmPassword,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    touchedFields,
    showRules,
    handleBlur,
    setShowRules,
    nameRef,
    emailErrorMessage,
    emailIsValid,
    passwordIsValid
  );

  return (
    <Form onSubmit={onSubmit}>
      <Box>
        {inputFields.map((field) => (
          <FormInputField key={field.id} field={field} />
        ))}
        <Button
          type="submit"
          className="w-full mt-4"
          buttonType="primary"
          isLoading={isLoading}
          isDisabled={!isFormValid}
        >
          Registrar
        </Button>
        <AuthLink preText="Já tem uma conta?" text="Faça login" href="/login" />
      </Box>
    </Form>
  );
};

export default RegisterForm;
