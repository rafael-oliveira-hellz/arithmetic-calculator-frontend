export interface Operation {
  id: string;
  type: OperationType;
  cost: number;
}

export type OperationType =
  | "ADDITION"
  | "SUBTRACTION"
  | "MULTIPLICATION"
  | "DIVISION"
  | "SQUARE_ROOT"
  | "RANDOM_STRING";

export type OperationsResponse = Operation[];

export interface Errors {
  value1?: string;
  value2?: string;
  general?: string;
}

export interface OperationsFormProps {
  balance: number;
}

export interface Option {
  id: string;
  type: string;
  cost: number;
}

export interface OperationSelectProps {
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (option: Option) => void;
}
