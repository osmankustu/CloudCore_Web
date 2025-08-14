import { create } from "zustand";
import { persist } from "zustand/middleware";

import { RemoveToken, SetToken } from "@/core/utils/token/tokenHandler";

import { LoginModel } from "../model/LoginModel";
import { LoginForApp, RevokeToken } from "../service/authService";

interface AuthState {
  token: string | null;
  login: (loginModel: LoginModel) => Promise<{
    status: "success" | "mfa_email" | "mfa_otp";
    message?: string;
  }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,

      login: async loginModel => {
        const response = await LoginForApp(loginModel);
        const { accessToken, requiredAuthenticatorType } = response.data;

        switch (requiredAuthenticatorType) {
          case 0:
            SetToken(accessToken.token); // dış kütüphane ya da util ile token saklanıyor
            // set({ token: accessToken.token });
            return { status: "success" };

          case 1:
            return {
              status: "mfa_email",
              message: `${loginModel.email} adresine doğrulama kodu gönderildi`,
            };

          case 2:
            return {
              status: "mfa_otp",
              message: "Otp uygulamanızdaki kodu giriniz",
            };

          default:
            return { status: "mfa_email" }; // fallback
        }
      },

      logout: () => {
        RevokeToken();
        set({ token: null });
        RemoveToken();
        localStorage.clear();
        window.location.href = "/signin";
        // SetToken(null) veya remove işlemleri gerekiyorsa burada yapılır
      },
    }),
    {
      name: "auth-token",
      partialize: state => ({ token: state.token }),
    },
  ),
);
