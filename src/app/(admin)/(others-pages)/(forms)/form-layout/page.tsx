import { Metadata } from "next";
import React from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicForm from "@/components/form/example-form/BasicForm";
import ExampleFormOne from "@/components/form/example-form/ExampleFormOne";
import ExampleFormWithIcon from "@/components/form/example-form/ExampleFormWithIcon";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormLayout() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Layout" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-5 sm:space-y-6">
          <BasicForm />
          <ExampleFormOne />
        </div>
        <div className="space-y-6">
          <ExampleFormWithIcon />
        </div>
      </div>
    </div>
  );
}
