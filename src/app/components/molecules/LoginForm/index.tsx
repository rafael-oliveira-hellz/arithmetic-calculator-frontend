// LoginForm.tsx
"use client";

import InputField from "../InputField";
import Button from "../../atoms/Button";
import React from "react";
import Form from "../../atoms/Form";
import { Box } from "@chakra-ui/react";
import AuthLink from "../AuthLink";

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: React.ChangeEventHandler<HTMLInputElement>;
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  isLoading = false,
}): React.JSX.Element => {
  const isFormValid = username.trim().length > 0 && password.trim().length >= 0;

  return (
    <Form onSubmit={onSubmit}>
      <Box>
        <InputField
          id="username"
          value={username}
          onChange={onUsernameChange}
          iconType="email"
          placeholder="Digite seu email"
        />
        <InputField
          id="password"
          value={password}
          onChange={onPasswordChange}
          iconType="password"
          placeholder="Digite sua senha"
        />
        <Button
          type="submit"
          className="w-full mt-4"
          buttonType="primary"
          isLoading={isLoading}
          isDisabled={!isFormValid}
        >
          Login
        </Button>

        <AuthLink
          preText="Não tem uma conta?"
          text="Cadastre-se"
          href="/register"
        />
      </Box>
    </Form>
  );
};

export default LoginForm;
