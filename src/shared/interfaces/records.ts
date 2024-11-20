export interface RecordsResponse {
  content: Record[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Record {
  id: string;
  operation: Operation;
  user: string;
  amount: number;
  userBalance: number;
  operationResponse: string;
  date: string;
  deleted: boolean;
}

export interface Operation {
  id: string;
  type: string;
  cost: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}
