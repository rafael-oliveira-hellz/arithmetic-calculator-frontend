"use client";

import React, { ReactNode, useState } from "react";
import { Toast, ToastContext } from "../context/toast-context";
import { Box, Portal } from "@chakra-ui/react";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Portal>
        <Box position="fixed" top="4" right="4" zIndex="9999">
          {toasts.map((toast) => (
            <Box
              key={toast.id}
              bg={
                toast.status === "success"
                  ? "green.500"
                  : toast.status === "error"
                  ? "red.500"
                  : toast.status === "warning"
                  ? "yellow.500"
                  : "blue.500"
              }
              color="white"
              p={4}
              mb={4}
              borderRadius="md"
              shadow="md"
            >
              <strong>{toast.title}</strong>
              <Box>{toast.description}</Box>
            </Box>
          ))}
        </Box>
      </Portal>
    </ToastContext.Provider>
  );
};
