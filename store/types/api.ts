export type Response<T> = {
  timestamp: string;
  status: number;
  message: string;
  data: T;
};

export type UserRole = "ROLE_CANDIDATE" | "SUPER_ADMIN" | "ROLE_USER";