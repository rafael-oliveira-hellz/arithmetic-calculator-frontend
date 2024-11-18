"use client";

import React, { useState } from "react";

import FormLayout from "../../molecules/FormLayout";
import LoginForm from "../../molecules/LoginForm";
import { useAuthService } from "@/app/hooks/useAuthService";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/useToast";

const LoginBox: React.FC = () => {
  const { loginUser } = useAuthService();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      await loginUser(username, password);

      showToast({
        title: "Sucesso",
        description: "Login realizado com sucesso.",
        status: "success",
      });

      router.push("/");
    } catch (err) {
      setError(`Erro de login: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(JSON.stringify(error, null, 2));

  return (
    <FormLayout title="Bem-vindo de volta!">
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
