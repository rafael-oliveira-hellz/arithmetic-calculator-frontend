import { Record } from "../interfaces/record";
import { IUser } from "./user";

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  balance: number;
  accessToken: string;
  records: Record[];
}
