import { useAuthStore } from "@/store/auth_store";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const defaultConfigs: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
};

// Error Name and Message for each error type.
class ApiError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}


function attachTokenInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      // Skip auth routes
      if (
        config.url?.includes("/login") ||
        config.url?.includes("/register") ||
        config.url?.includes("/refresh")
      ) {
        return config;
      }

      const { accessToken } = useAuthStore.getState();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
}

function attachErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status ?? 0;
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong";

      const originalRequest = error.config;

      // 🔁 ADDITION: refresh token handling (minimal)
      instance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
          const status = error.response?.status;

          if (status === 401 && !originalRequest?._retry) {
            if (isRefreshing) {
              return new Promise((resolve) => {
                refreshQueue.push((token: string) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  resolve(instance(originalRequest));
                });
              });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
              const { refreshToken } = useAuthStore.getState();
              if (!refreshToken) throw new Error("No refresh token");

              const res = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/v1/auth/refresh`,
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                  },
                },
              );

              const { accessToken } = res.data;

              useAuthStore.setState({
                accessToken,
                isAuthenticated: true,
              });

              isRefreshing = false;
              onRefreshed(accessToken);

              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return instance(originalRequest);
            } catch (refreshError) {
              isRefreshing = false;
              refreshQueue = [];

              useAuthStore.getState().logout();

              // 🚨 THIS IS CRITICAL
              return Promise.reject(refreshError);
            }
          }

          // 🚨 ALSO REQUIRED
          return Promise.reject(error);
        },
      );

      // ⬇️ ORIGINAL LOGIC — UNCHANGED ⬇️

      if (error.code === "ECONNABORTED") {
        return Promise.reject(
          new ApiError("Timeout Error", "Request timed out. Please try again."),
        );
      }

      if (error.code === "ERR_NETWORK" || status === 0) {
        return Promise.reject(
          new ApiError("Network Error", "Network Error. Please try again."),
        );
      }

      if (status === 400) {
        return Promise.reject(new ApiError("Bad Request", message));
      }

      if ([401, 403].includes(status)) {
        return Promise.reject(
          new ApiError("Unauthorized", "Session expired. Please login again."),
        );
      }

      if (status === 404) {
        return Promise.reject(new ApiError("Not Found", "API not found"));
      }

      return Promise.reject(new ApiError("Error", message));
    },
  );
}

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    ...defaultConfigs,
  });

  attachTokenInterceptor(instance);
  attachErrorInterceptor(instance);

  return instance;
}

const api = createApiClient();

export { api };
