"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useApi from "./useApi";
import { login, logout } from "../store/slices/auth-slice";
import { AppDispatch } from "../store/store";
import { IUser } from "@/shared/types/user";
import { useToast } from "@chakra-ui/react";

export const useAuthService = () => {
  const api = useApi();
  const router = useRouter();
  const toast = useToast();
  const dispatch: AppDispatch = useDispatch();

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
        toast({
          title: "Action failed",
          description: "Access denied. User does not exist.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        throw new Error("Access denied. User does not exist.");
      }

      dispatch(login({ user: response, accessToken: response.accessToken }));

      sessionStorage.setItem("accessToken", response.accessToken);
    } catch (error) {
      toast({
        title: "Action failed",
        description: `Login failed: ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      toast({
        title: "Action failed",
        description: "Logout failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    }
  };

  return {
    loginUser,
    logoutUser,
  };
};
