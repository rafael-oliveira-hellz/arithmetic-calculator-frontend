// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Tipos globais para a store e dispatch, facilitando o uso em componentes
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
