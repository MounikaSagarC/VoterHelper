export type Response<T> = {
  timestamp: string;
  status: number;
  message: string;
  data: T;
};