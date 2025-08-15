"use client";
import { Modal } from "@/components/ui/modal";
import React from "react";
import Switch from "@/components/form/switch/Switch";
import { useUserStore } from "../../store/useUserStore";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { DisableEmail, EnableEmail } from "@/features/auth/service/authService";
import { showError, showSuccess } from "@/core/utils/toast/toastHelper";
import UserOtpVerificationForm from "../forms/UserOtpVerificationForm";
import UserEditForm from "../forms/UserEditForm";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import CardUpdateButton from "@/components/ui/button/CardUpdateButton";
import ChangePasswordButton from "../custom/buttons/ChangePasswordButton";

const AuthenticatorSettingsCard = () => {
  const { identityUser, fetchIdentityUser } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const { run, isLoading } = useRequestAction();

  const enableEmail = async (status: boolean) => {
    if (status) {
      if (identityUser?.authenticatorType != (1 || 2 || 3)) {
        run(async () => {
          const response = await EnableEmail();
          if (response?.status == 202) {
            showSuccess("E-Posta adresinize doğrulama linki gönderilmiştir");
            fetchIdentityUser();
          }
        });
      } else {
        showError("Zaten bir doğrulamaya sahipsiniz.");
      }
    } else {
      run(async () => {
        const disableResponse = await DisableEmail();
        if (disableResponse?.status == 200) {
          showSuccess("E-Posta yetkilendirme sistemi kapatıldı.");
          fetchIdentityUser();
        }
      });
    }
  };

  const enablePhone = async (status: boolean) => {
    if (status) {
      if (identityUser?.authenticatorType != (1 || 2 || 3)) {
        run(async () => {
          const response = await EnableEmail();
          if (response?.status === 202) {
            showSuccess("E-Posta adresinize doğrulama linki gönderilmiştir");
          }
        });
      } else {
        showError("Zaten bir doğrulamaya sahipsiniz.");
      }
    } else {
      showSuccess("E-Posta yetkilendirme sistemi kapatıldı.");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        Güvenlik Ve Gizlilik
      </h3>

      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-gray-800 dark:text-white/90">Şifre Değiştir</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Şifrenizi değiştirin.</p>
          </div>
          <ChangePasswordButton onClick={openModal} text="Şifre Değiştir" />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-gray-800 dark:text-white/90">OTP Yetkilendirme</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Google Authenticator vb. uygulamalar ile çalışır.
            </p>
          </div>
          <UserOtpVerificationForm identityUser={identityUser!} onChange={() => {}} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-gray-800 dark:text-white/90">E-Posta Yetkilendirme</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Girişlerde e-posta doğrulaması iste.
            </p>
          </div>
          <Switch
            label={identityUser?.authenticatorType == 1 ? "Açık" : "Kapalı"}
            color="green"
            defaultChecked={identityUser?.authenticatorType == 1}
            onChange={value => enableEmail(value)}
          />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-gray-800 dark:text-white/90">Telefon Yetkilendirme</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Girişlerde SMS ile doğrulama iste.
            </p>
          </div>
          <Switch
            label={identityUser?.authenticatorType == 3 ? "Açık" : "Kapalı"}
            color="green"
            defaultChecked={identityUser?.authenticatorType == 3}
            onChange={() => {}}
          />
        </div>
      </div>

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
        <ChangePasswordForm isOpen={isOpen} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default AuthenticatorSettingsCard;
