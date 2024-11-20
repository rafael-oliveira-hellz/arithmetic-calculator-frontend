// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // Usa o localStorage como padrão
import { AuthState } from '@/shared/types/auth-state';

const persistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage: storageSession
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// });
// Configuração da store
const isClient = typeof window !== 'undefined' || typeof window === null;
const store = configureStore({
  reducer: {
    auth: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER'
        ]
      }
    })
});
const persistor = isClient ? persistStore(store) : null;
// Tipos globais para a store e dispatch, facilitando o uso em componentes
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { persistor, isClient };
export default store;
