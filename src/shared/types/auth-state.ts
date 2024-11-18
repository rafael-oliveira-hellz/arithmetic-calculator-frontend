import { Record } from "@/app/components/organisms/Dashboard";
import { IUser } from "./user";

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  balance: number;
  accessToken: string;
  records: Record[];
}
