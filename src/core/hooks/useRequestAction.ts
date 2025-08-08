import { useState } from "react";

import { useFormErrors } from "@/core/context/FormErrorContext";

import { useBackendErrors } from "./useBackendErrors";

export const useRequestAction = () => {
  const { setErrorsFromBackend } = useFormErrors();
  const { handleBackendError } = useBackendErrors();
  const [isLoading, setLoading] = useState<boolean>(false);

  const run = async <T = unknown>(callback: () => Promise<T>): Promise<T | undefined> => {
    try {
      setLoading(true);
      return await callback();
    } catch (error) {
      const axiosError = error as {
        response?: {
          data?: {
            Errors?: { Property: string; Errors: string[] }[];
            detail?: string;
            [key: string]: unknown;
          };
        };
      };

      const data = axiosError.response?.data;

      if (data?.Errors) {
        setErrorsFromBackend(data.Errors);
      } else if (data?.detail) {
        handleBackendError(data);
      } else {
        console.error("Unhandled error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { run, isLoading };
};
