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
      <Form onSubmit={onSubmit} role="form">
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
            placeholder="Type your username"
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
            placeholder="Type your password"
          />
          <Button
            type="submit"
            className="w-full mt-4"
            bg="gray.700"
            _hover={{ bg: "#14CFB1", color: "gray.700" }}
            color="#FFF"
            buttonType="secondary"
            isLoading={isLoading}
            isDisabled={!isFormValid}
          >
            Login
          </Button>
        </Box>
      </Form>
      {isLoading && (
        <Box
          data-testid="button-spinner"
          className="absolute flex justify-center items-center bg-[#00000030] w-full h-full top-0 bottom-0 right-0 left-0 z-40"
        >
          <Spinner className="relative z-50" width="50px" height="50px" />
        </Box>
      )}
    </>
  );
};

export default LoginForm;
