// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import operationsReducer from "./slices/operations-slice";
import recordsReducer from "./slices/record-slice";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { AuthState } from "@/shared/types/auth-state";

const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage: storageSession,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const isClient = typeof window !== "undefined" || typeof window === null;

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    records: recordsReducer,
    operations: operationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

const persistor = isClient ? persistStore(store) : null;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { persistor, isClient };
export default store;
