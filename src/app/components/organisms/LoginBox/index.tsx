"use client";

import React, { useState } from "react";

import FormLayout from "../../molecules/FormLayout";
import LoginForm from "../../molecules/LoginForm";
import { useAuthService } from "@/app/hooks/useAuthService";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const LoginBox: React.FC = () => {
  const { loginUser } = useAuthService();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toast = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await loginUser(username, password);

      toast({
        title: "Success",
        description: "Login successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/");
    } catch (err) {
      toast({
        title: "Error",
        description: `Login failed: ${err}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout title="Welcome back!">
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    </FormLayout>
  );
};

LoginBox.displayName = "LoginBox";

export default LoginBox;
