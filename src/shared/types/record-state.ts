import { Record } from "../interfaces/records";

export interface RecordsState {
  records: Record[];
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
}
