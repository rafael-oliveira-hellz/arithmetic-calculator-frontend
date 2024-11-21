import { Record } from './records';

export interface RecordTableRowProps {
  record: Record;
  onDelete: (recordId: string) => void;
}
