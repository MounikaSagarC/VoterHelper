// import { EXPO_PUBLIC_API_URL } from "@/constants";
import { useAuthStore } from "@/store/auth_store";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

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

function attachTokenInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      // Skip auth routes
      if (config.url?.includes("/login") || config.url?.includes("/register")) {
        return config;
      }

      const { accessToken } = useAuthStore.getState();

      if (!accessToken) {
        return Promise.reject(new Error("No access token found"));
      }

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error),
  );
}

function attachErrorInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status ?? 0;
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Something went wrong";

      if (error.code === "ECONNABORTED") {
        return Promise.reject(
          new ApiError("Timeout Error", "Request timed out. Please try again.")
        );
      }

      if (error.code === "ERR_NETWORK" || status === 0) {
        return Promise.reject(
          new ApiError("Network Error", "Network Error. Please try again.")
        );
      }

      if (status === 400) {
        return Promise.reject(new ApiError("Bad Request", message));
      }

      if ([401, 403].includes(status)) {
        return Promise.reject(
          new ApiError("Unauthorized", "Session expired. Please login again.")
        );
      }

      if (status === 404) {
        return Promise.reject(new ApiError("Not Found", "API not found"));
      }

      return Promise.reject(new ApiError("Error", message));
    }
  );
}

function createApiClient(): AxiosInstance {
  const instance = axios.create({
    baseURL:process.env.EXPO_PUBLIC_API_URL,
    ...defaultConfigs,
  });

  attachTokenInterceptor(instance);
  attachErrorInterceptor(instance);

  return instance;
}

const api = createApiClient();

export { api };
