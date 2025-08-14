import axios from "axios";
import nookies from "nookies";

import { RefreshToken } from "@/features/auth/service/authService";

import { GetToken } from "../utils/token/tokenHandler";

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

const axiosInstance = axios.create({
  baseURL: "/api/proxy", // Buraya API'nizin base URL'ini koymalısınız
  //timeout: 10000,                      // API'ye yapılacak istekler için timeout süresi (10 saniye)
});

// İstediğiniz ekstra ayarları ve interceptors'ları buraya ekleyebilirsiniz
// Örneğin, her istekten önce token eklemek için interceptors kullanabilirsiniz

axiosInstance.interceptors.request.use(
  config => {
    // Burada token ekleyebilirsiniz (örn. localStorage'dan alabilirsiniz)
    const token = GetToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // custom flag
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: unknown) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await RefreshToken();
        const newToken = response.token;

        nookies.set(undefined, "token", newToken, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          httpOnly: false,
          maxAge: 60 * 60,
        });
        processQueue(null, newToken);
        console.log("buradayım1");
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        nookies.destroy(undefined, "token");
        console.log("buradayım");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
