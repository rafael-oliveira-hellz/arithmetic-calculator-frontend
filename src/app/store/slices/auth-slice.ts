import { Record } from "@/shared/interfaces/record";
import { AuthState } from "@/shared/types/auth-state";
import { IUser } from "@/shared/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  balance: 0,
  accessToken: "",
  records: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: IUser; accessToken: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.balance = action.payload.user.balance;
      state.accessToken = action.payload.user.accessToken;
      sessionStorage.setItem("accessToken", action.payload.user.accessToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.balance = 0;
      state.accessToken = "";
      sessionStorage.removeItem("accessToken");
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    updateRecords: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload;
    },
    removeRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(
        (record: Record) => record.id !== action.payload
      );
    },
  },
});

export const { login, logout, updateBalance, updateRecords, removeRecord } =
  authSlice.actions;
export default authSlice.reducer;
