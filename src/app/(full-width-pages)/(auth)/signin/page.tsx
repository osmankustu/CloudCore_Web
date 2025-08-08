import { Metadata } from "next";
import { Suspense } from "react";

import SignInForm from "@/features/auth/components/SignInForm";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function SignIn() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <SignInForm />
    </Suspense>
  );
}
