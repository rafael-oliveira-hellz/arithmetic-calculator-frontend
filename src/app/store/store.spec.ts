import store, { persistor, isClient, RootState } from "./store";
import { PersistConfig } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import authReducer from "./slices/auth-slice";
import { persistReducer } from "redux-persist";
import { AuthState } from "@/shared/types/auth-state";

describe("Redux Store", () => {
  it("should configure the store with the correct reducers", () => {
    const state = store.getState();
    expect(state).toHaveProperty("auth");
    expect(state).toHaveProperty("records");
    expect(state).toHaveProperty("operations");
  });

  it("should create a persistor only in the client environment", () => {
    if (isClient) {
      expect(persistor).not.toBeNull();
    } else {
      expect(persistor).toBeNull();
    }
  });

  it("should have a valid RootState type", () => {
    const state: RootState = store.getState();
    expect(state).toBeDefined();
    expect(state.auth).toBeDefined();
    expect(state.records).toBeDefined();
    expect(state.operations).toBeDefined();
  });
});

describe("Persisted Auth Reducer", () => {
  // Tipagem do persistConfig corrigida
  const persistConfig: PersistConfig<AuthState> = {
    key: "auth",
    storage: storageSession,
  };

  // Criar um wrapper que adiciona o campo `_persist`
  const createPersistedAuthReducer = () =>
    persistReducer<AuthState>(persistConfig, authReducer);

  it("should wrap authReducer with persistReducer", () => {
    const persistedAuthReducer = createPersistedAuthReducer();
    expect(persistedAuthReducer).toBeInstanceOf(Function);
  });
});

describe("Middleware Configuration", () => {
  it("should ignore redux-persist actions in serializableCheck", () => {
    const middlewareAction = store.dispatch({ type: "persist/PERSIST" });

    expect(() => middlewareAction).not.toThrow();

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    store.dispatch({ type: "unknown/TYPE" });
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
