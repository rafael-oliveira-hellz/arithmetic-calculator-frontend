"use client";

import { createContext } from "react";

export interface Toast {
  id: number;
  title: string;
  description: string;
  status: "success" | "error" | "info" | "warning";
}

interface ToastContextProps {
  showToast: (toast: Omit<Toast, "id">) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);
