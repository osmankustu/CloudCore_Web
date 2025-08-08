"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

type BackendValidationError = {
  Property: string;
  Errors: string[];
};

type FormErrorContextType = {
  errors: Record<string, string | null>;
  setErrorsFromBackend: (validationErrors: BackendValidationError[]) => void;
  clearErrors: () => void;
};

const FormErrorContext = createContext<FormErrorContextType | null>(null);

export const FormErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const setErrorsFromBackend = (validationErrors: BackendValidationError[]) => {
    const mapped: Record<string, string> = {};

    validationErrors.forEach(err => {
      if (err.Errors.length > 0) {
        const key = err.Property; // normalize
        const message = err.Errors[0];
        mapped[key] = message;

        toast.warn(message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });

    setErrors(mapped);
  };

  const clearErrors = () => setErrors({});

  return (
    <FormErrorContext.Provider value={{ errors, setErrorsFromBackend, clearErrors }}>
      {children}
    </FormErrorContext.Provider>
  );
};

export const useFormErrors = () => {
  const context = useContext(FormErrorContext);
  if (!context) throw new Error("useFormErrors must be used within a FormErrorProvider");
  return context;
};
