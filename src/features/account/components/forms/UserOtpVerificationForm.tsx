"use client";
import Switch from "@/components/form/switch/Switch";
import { Modal } from "@/components/ui/modal";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { IdentityUserModel } from "../../model/user";
import { useModal } from "@/core/hooks/useModal";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useUserStore } from "../../store/useUserStore";
import { OtpModel } from "../../model/Otp";
import { DisableOtp, EnableOTP, VerifyOtp } from "@/features/auth/service/authService";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";
import Spinner from "@/components/ui/spinner/Spinner";
import QrCodeGenerator from "../custom/QrCodeGenerator";
import SettingsButton from "../custom/buttons/SettingsButton";

const UserOtpVerificationForm = ({
  identityUser,
  onChange,
}: {
  identityUser: IdentityUserModel;
  onChange: (value: boolean) => void;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { run, isLoading } = useRequestAction();
  const { fetchIdentityUser } = useUserStore();
  const [otp, setOtp] = useState<OtpModel | undefined>();
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    setOtp(undefined);
  }, [isOpen]);

  const handleEnableOtp = () => {
    run(async () => {
      const response = await EnableOTP();
      if (response?.status === 200) {
        setOtp(response.data);
      }
    });
  };

  const handleVerifyOtp = async () => {
    run(async () => {
      const response = await VerifyOtp(code);
      if (response?.status === 200) {
        showSuccess("Doğrulama Başarılı");
        closeModal();
        fetchIdentityUser();
      }
    });
  };

  const handleDisableOtp = (status: boolean) => {
    run(async () => {
      if (!status) {
        const response = await DisableOtp();
        if (response?.status == 200) {
          showSuccess("Otp yetkilendirme devre dışı bıraklıdı.");
          fetchIdentityUser();
        }
      }
    });
  };

  return (
    <div>
      {identityUser.authenticatorType == 2 ? (
        <>
          <Switch
            label="Açık"
            color="green"
            defaultChecked={identityUser.authenticatorType == 2}
            onChange={value => handleDisableOtp(value)}
          />
        </>
      ) : (
        <>
          <SettingsButton
            onClick={() => {
              handleEnableOtp();
              openModal();
            }}
            text="Kurulum"
          />
        </>
      )}

      <Modal mode="wait" isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[900px]">
        <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
          <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                  OTP Yetkilendirme Aktivasyonu
                </h4>
                <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
                  Google Authenticator vb. uygulamaya QR kodunuzu taratınız, ardından çıkan
                  aktivasyon kodunu giriniz.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 px-2 pb-3">
                {otp ? (
                  <>
                    <div className="rounded-xl bg-white p-4 shadow dark:bg-gray-800">
                      <QrCodeGenerator value={otp?.googleAuthenticator} />
                    </div>

                    <div className="text-center">
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Secret Key
                      </label>
                      <div className="inline-block rounded-md bg-gray-100 px-4 py-2 font-mono text-sm tracking-wide dark:bg-gray-800 dark:text-white">
                        {otp?.secretKey}
                      </div>
                      <div className="mt-5">
                        <Label>Doğrulama Kodu</Label>
                        <Input
                          type="text"
                          placeholder="Doğrulama kodunu giriniz"
                          onChange={e => setCode(e.target.value)}
                        />
                      </div>
                      <div className="mt-5">
                        <div className="flex items-center justify-center gap-3">
                          <Button size="sm" variant="outline" onClick={closeModal}>
                            Vazgeç
                          </Button>
                          <Button size="sm" onClick={handleVerifyOtp} disabled={isLoading}>
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <SmoothSpinner />
                                <span>Doğrulanıyor...</span>
                              </div>
                            ) : (
                              "Doğrula"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Spinner />
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserOtpVerificationForm;
