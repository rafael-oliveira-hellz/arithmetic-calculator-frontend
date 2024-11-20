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
