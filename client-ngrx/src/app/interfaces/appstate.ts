import { DataState } from "../enum/database.enum";

export interface AppState<T> {
    dataState: DataState;
    data?: T;
    error?: string;
  }