"use client";

import React, { useState } from "react";

import FormLayout from "../../molecules/FormLayout";
import LoginForm from "../../molecules/LoginForm";
import { useAuthService } from "@/app/hooks/useAuthService";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

/**
 * A login box component that displays a login form and handles the
 * submission of the form using the {@link useAuthService} hook.
 *
 * @returns A login box component containing a login form.
 */
const LoginBox: React.FC = (): React.JSX.Element => {
  const { loginUser } = useAuthService();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toast = useToast();
  const router = useRouter();

  /**
   * Handles the login form submission.
   *
   * Prevents the default form submission action, shows a loading indicator, and
   * attempts to log in using the provided username and password.
   *
   * If the login is successful, shows a success toast and redirects to the
   * homepage. If the login fails, shows an error toast with the error message.
   * Finally, hides the loading indicator regardless of the login outcome.
   *
   * @param {React.FormEvent<HTMLFormElement>} e The form submission event.
   */
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
        position: "top-right",
      });

      router.push("/");
    } catch (err) {
      toast({
        title: "Error",
        description: `Login failed: ${err}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
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
