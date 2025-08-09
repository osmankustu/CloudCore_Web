"use client";

import React from "react";

import { FormErrorProvider } from "@/core/context/FormErrorContext";
import { useSidebar } from "@/core/context/SidebarContext";
import AppHeader from "@/core/layout/AppHeader";
import AppSidebar from "@/core/layout/AppSidebar";
import Backdrop from "@/core/layout/Backdrop";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <FormErrorProvider>
        {/* Sidebar and Backdrop */}
        <AppSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">{children}</div>
        </div>
      </FormErrorProvider>
    </div>
  );
}
