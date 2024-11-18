import { InputFieldConfig } from "@/shared/interfaces/input-field";
import React from "react";
import EmailRules from "../components/molecules/EmailRules";
import PasswordRules from "../components/molecules/PasswordRules";

export const getInputFieldsConfig = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  onNameChange: React.ChangeEventHandler<HTMLInputElement>,
  onEmailChange: React.ChangeEventHandler<HTMLInputElement>,
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>,
  onConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement>,
  touchedFields: { [key: string]: boolean },
  showRules: { email: boolean; password: boolean },
  handleBlur: (
    field: "name" | "email" | "password" | "confirmPassword"
  ) => void,
  setShowRules: React.Dispatch<
    React.SetStateAction<{ email: boolean; password: boolean }>
  >,
  nameRef: React.RefObject<HTMLInputElement>,
  emailErrorMessage?: string,
  emailIsValid?: boolean,
  passwordIsValid?: boolean
): InputFieldConfig[] => [
  {
    id: "name",
    value: name,
    onChange: onNameChange,
    iconType: "name",
    placeholder: "Digite seu nome",
    isValid: touchedFields.name && name.trim().length > 0 ? true : undefined,
    onBlur: () => handleBlur("name"),
    showRules: false,
    ref: nameRef,
  },
  {
    id: "email",
    value: email,
    onChange: onEmailChange,
    iconType: "email",
    placeholder: "Digite seu email",
    isValid: touchedFields.email ? emailIsValid : undefined,
    errorMessage:
      touchedFields.email && !emailIsValid ? emailErrorMessage : undefined,
    showRules: showRules.email,
    onFocus: () => setShowRules((prev) => ({ ...prev, email: true })),
    onBlur: () => {
      handleBlur("email");
      setShowRules((prev) => ({ ...prev, email: false }));
    },
    rulesComponent: <EmailRules email={email} />,
  },
  {
    id: "password",
    value: password,
    onChange: onPasswordChange,
    iconType: "password",
    placeholder: "Digite sua senha",
    isValid: touchedFields.password ? passwordIsValid : undefined,
    showRules: showRules.password,
    onFocus: () => setShowRules((prev) => ({ ...prev, password: true })),
    onBlur: () => {
      handleBlur("password");
      setShowRules((prev) => ({ ...prev, password: false }));
    },
    rulesComponent: <PasswordRules password={password} />,
  },
  {
    id: "confirmPassword",
    value: confirmPassword,
    onChange: onConfirmPasswordChange,
    iconType: "password",
    placeholder: "Confirme sua senha",
    onBlur: () => handleBlur("confirmPassword"),
    isValid: touchedFields.confirmPassword
      ? confirmPassword === password
        ? true
        : false
      : undefined,
    showRules: false,
  },
];
