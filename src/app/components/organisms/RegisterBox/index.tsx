"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormLayout from "../../molecules/FormLayout";
import ErrorMessage from "../../atoms/ErrorMessage";
import RegisterForm from "../../molecules/RegisterForm";

const RegisterBox: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [validations, setValidations] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password: string) => {
    const rules = [
      (pw: string) => pw.length >= 8,
      (pw: string) => /[A-Z]/.test(pw),
      (pw: string) => /[a-z]/.test(pw),
      (pw: string) => /[0-9]/.test(pw),
      (pw: string) => /[^A-Za-z0-9]/.test(pw),
      (pw: string) => !/[\sáàâãäéèêëíìîïóòôõöúùûüçñ]/i.test(pw),
    ];
    return rules.every((rule) => rule(password));
  };

  const isFormValid = Object.values(validations).every((isValid) => isValid);

  useEffect(() => {
    setValidations({
      name: formData.name.trim().length > 0,
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword:
        formData.confirmPassword.length > 0 &&
        formData.password === formData.confirmPassword,
    });
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError("Por favor, corrija os erros antes de continuar.");
      return;
    }

    try {
      setIsLoading(true);

      // Chame a API para registrar o usuário
      console.log(JSON.stringify(formData, null, 2));

      // Lógica de registro
      router.push("/login");
    } catch (err) {
      setError(`Erro de registro: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(JSON.stringify(formData, null, 2));

  return (
    <FormLayout title="Crie sua conta">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <RegisterForm
        name={formData.name}
        email={formData.email}
        password={formData.password}
        confirmPassword={formData.confirmPassword}
        onNameChange={(e) => handleInputChange("name", e.target.value)}
        onEmailChange={(e) => handleInputChange("email", e.target.value)}
        onPasswordChange={(e) => handleInputChange("password", e.target.value)}
        onConfirmPasswordChange={(e) =>
          handleInputChange("confirmPassword", e.target.value)
        }
        onSubmit={handleRegister}
        passwordIsValid={validations.password}
        confirmPasswordIsValid={validations.confirmPassword}
        nameIsValid={validations.name}
        emailIsValid={validations.email}
        isLoading={isLoading}
        isFormValid={isFormValid}
      />
    </FormLayout>
  );
};

RegisterBox.displayName = "RegisterBox";

export default RegisterBox;
