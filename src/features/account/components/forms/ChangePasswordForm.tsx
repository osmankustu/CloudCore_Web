import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePersonelStore } from "@/features/personel/store/usePersonelStore";
import { useFormErrors } from "@/core/context/FormErrorContext";
import { useUserStore } from "../../store/useUserStore";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { UpdateFromAuth } from "../../service/userService";
import { showSuccess } from "@/core/utils/toast/toastHelper";
import { SetToken } from "@/core/utils/token/tokenHandler";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SmoothSpinner } from "@/components/ui/spinner/SmoothSpinner";

const ChangePasswordForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {} = usePersonelStore();
  const { errors, clearErrors } = useFormErrors();
  const { user, identityUser, changePasswordForm, setFormField, fetchIdentityUser } =
    useUserStore();

  const { run, isLoading } = useRequestAction();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    clearErrors?.();
  }, [isOpen]);

  const handleSave = () => {
    run(async () => {
      const response = await UpdateFromAuth(changePasswordForm);
      if (response.status === 200) {
        showSuccess("Şifreniz değiştirildi.");
        SetToken(response.data.accessToken.token);
        onClose();
        clearErrors?.();
      }
    });
  };

  return (
    <div>
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Şifre Değiştir
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
              Hesap güvenliği için şifrenizi 3 ay veya 6 ayda bir değiştirmenizi tavsiye ederiz.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Eski Şifre</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Eski Şifreniz"
                        onChange={e => setFormField("password", e.target.value)}
                        error={!!errors.Password}
                        hint={errors.Password!}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <FaEye className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <FaEye className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Yeni Şifre</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Yeni şifreniz"
                        onChange={e => setFormField("newPassword", e.target.value)}
                        error={!!errors.NewPassword}
                        hint={errors.NewPassword!}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <FaEye className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <FaEyeSlash className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Yeni Şifre Tekrar</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Yeni şifreniz"
                        onChange={e => setFormField("newPassword", e.target.value)}
                        error={!!errors.NewPassword}
                        hint={errors.NewPassword!}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <FaEye className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <FaEyeSlash className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <SmoothSpinner />
                    <span>Değiştiriliyor...</span>
                  </div>
                ) : (
                  "Değiştir"
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
