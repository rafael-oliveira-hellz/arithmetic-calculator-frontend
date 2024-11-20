import { storage } from "@/app/utils/storage";
import { Record } from "@/shared/interfaces/records";
import { AuthState } from "@/shared/types/auth-state";
import { IUser } from "@/shared/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: !!storage.getItem<string>("accessToken"),
  user: null,
  balance: 0,
  accessToken: storage.getItem<string>("accessToken", "") || "",
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
      state.accessToken = action.payload.accessToken;
      storage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.balance = 0;
      state.accessToken = "";
      storage.clear();
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
