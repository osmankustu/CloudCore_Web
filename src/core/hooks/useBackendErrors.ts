import { useState } from "react";
import { toast } from "react-toastify";

enum ErrorTypes {
  Authorization = "https://example.com/probs/authorization",
  Authentication = "https://example.com/probs/authentication",
  Business = "https://example.com/probs/business",
  Internal = "https://example.com/probs/internal",
  NotFound = "https://example.com/probs/notfound",
  Validation = "https://example.com/probs/validation",
}

type ApiErrorResponse = {
  title?: string;
  status?: number;
  detail?: string;
  type?: ErrorTypes;
};
type ApiError = Required<ApiErrorResponse>;

export const useBackendErrors = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleBackendError = (errorResponse: ApiErrorResponse) => {
    const apiError: ApiError = {
      title: errorResponse.title || "Hata",
      status: errorResponse.status || 400,
      detail: errorResponse.detail || "Beklenmeyen bir hata oluştu.",
      type: errorResponse.type ?? ErrorTypes.Internal,
    };

    setError(apiError);

    const toastOptions = {
      position: "bottom-right" as const,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (apiError.type) {
      case "https://example.com/probs/authorization":
        toast.error(apiError.detail, toastOptions);
        break;
      case "https://example.com/probs/authentication":
        toast.error(apiError.detail, toastOptions);
        break;
      case "https://example.com/probs/business":
        toast.warn(apiError.detail, toastOptions);
        break;
      case "https://example.com/probs/internal":
        toast.error(apiError.detail, toastOptions);
        break;
      case "https://example.com/probs/notfound":
        toast.error(apiError.detail, toastOptions);
        break;
      case "https://example.com/probs/validation":
        toast.error(apiError.detail, toastOptions);
        break;
      default:
        toast.error(apiError.detail, toastOptions);
        break;
    }
  };

  const clearBackendError = () => setError(null);

  return { error, handleBackendError, clearBackendError };
};
