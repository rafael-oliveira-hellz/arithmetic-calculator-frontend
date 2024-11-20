"use client";

import InputField from "../InputField";
import Button from "../../atoms/Button";
import React from "react";
import Form from "../../atoms/Form";
import { Box } from "@chakra-ui/react";
import { LoginFormProps } from "@/shared/interfaces/login-form-props";
import Spinner from "../Spinner";

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
    <>
      <Form onSubmit={onSubmit}>
        <Box>
          <InputField
            id="username"
            value={username}
            onChange={(value) =>
              onUsernameChange({
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            iconType="email"
            placeholder="Digite seu email"
          />
          <InputField
            id="password"
            value={password}
            onChange={(value) =>
              onPasswordChange({
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
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
        </Box>
      </Form>
      {isLoading && (
        <Box className="absolute flex justify-center items-center bg-[#00000030] w-full h-full top-0 bottom-0 right-0 left-0 z-40">
          <Spinner className="relative z-50" width="50px" height="50px" />
        </Box>
      )}
    </>
  );
};

export default LoginForm;
