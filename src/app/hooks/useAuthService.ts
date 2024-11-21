"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useApi from "./useApi";
import { login, logout } from "../store/slices/auth-slice";
import { AppDispatch } from "../store/store";
import { IUser } from "@/shared/types/user";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { storage } from "../utils/storage";

/**
 * Provides methods for logging in and out users, and for displaying error
 * toast notifications.
 *
 * The `useAuthService` hook provides methods for logging in and out users, and
 * for displaying error toast notifications. The `loginUser` method logs in a
 * user with the given username and password, and stores the access token in
 * session storage. The `logoutUser` method logs out the user and redirects to
 * the login page. The `showErrorToast` method displays an error toast
 * notification with a given message.
 *
 * @returns An object with the following properties:
 *   - `loginUser`: A function that logs in a user with the given username and
 *     password.
 *   - `logoutUser`: A function that logs out the user and redirects to the
 *     login page.
 *   - `showErrorToast`: A function that displays an error toast notification
 *     with a given message.
 */
export const useAuthService = () => {
  const api = useApi();
  const router = useRouter();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();

  /**
   * Logs in a user with the given username and password, and stores the
   * access token in session storage.
   *
   * @param {string} username The username to log in with.
   * @param {string} password The password to log in with.
   *
   * @throws {Error} If the login fails, an error is thrown with a message
   *   indicating the reason for the failure.
   */
  const loginUser = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await api.post<IUser>("/login", {
        username,
        password,
      });

      if (!response.active) {
        storage.clear();
        const errorMessage = "Access denied. User does not exist.";
        showErrorToast(errorMessage);
        throw new Error(errorMessage);
      }

      dispatch(login({ user: response, accessToken: response.accessToken }));

      sessionStorage.setItem("accessToken", response.accessToken);
    } catch (error) {
      storage.clear();
      const errorMessage =
        error instanceof AxiosError
          ? `Login failed: ${error.message}`
          : "Login failed: An unexpected error occurred";

      showErrorToast(errorMessage);
      throw new Error(errorMessage);
    }
  };

  /**
   * Displays an error toast notification with a given message.
   *
   * @param message - The error message to be displayed in the toast notification.
   */
  const showErrorToast = (message: string) => {
    toast({
      title: "Action failed",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  /**
   * Logs out the user and redirects to the login page.
   *
   * If any error occurs during the logout process, an error toast notification
   * is displayed with the corresponding error message.
   *
   * @throws {Error} If any error occurs during the logout process.
   */
  const logoutUser = async (): Promise<void> => {
    try {
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.message
          : "Logout failed. Please try again.";

      showErrorToast(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    loginUser,
    logoutUser,
  };
};
