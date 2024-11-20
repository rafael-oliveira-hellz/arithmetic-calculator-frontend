import { IUser } from "./user";

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  balance: number;
  accessToken: string;
}
