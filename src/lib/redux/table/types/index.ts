import { type ResponseStatus } from "@/types";
import { type TableData } from "@/types/table";

export interface InitialTableSliceState {
  results: TableData[];
  prev: string | null;
  next: string | null;
  count: number;
  status: ResponseStatus;
}

export interface TableParams {
  offset: number;
  limit: number;
}
