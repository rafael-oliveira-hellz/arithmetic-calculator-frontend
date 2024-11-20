"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import useApi from "./useApi";
import { useToast } from "./useToast";
import { login, logout } from "../store/slices/auth-slice";
import { AppDispatch } from "../store/store";
import { IUser } from "@/shared/types/user";

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
        toast.showToast({
          title: "Erro",
          description: "Usuário não existe. Acesso negado.",
          status: "error",
        });
        throw new Error("Access denied. User does not exist.");
      }

      dispatch(login({ user: response, accessToken: response.accessToken }));

      sessionStorage.setItem("accessToken", response.accessToken);
    } catch (error) {
      toast.showToast({
        title: "Erro",
        description: "Falha ao realizar login.",
        status: "error",
      });
      throw error;
    }
  };

  const logoutUser = async (): Promise<void> => {
    try {
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      toast.showToast({
        title: "Erro",
        description: "Erro ao realizar logout.",
        status: "error",
      });
      throw error;
    }
  };

  return {
    loginUser,
    logoutUser,
  };
};
