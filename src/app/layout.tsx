import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Outfit } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { SidebarProvider } from "@/core/context/SidebarContext";
import { ThemeProvider } from "@/core/context/ThemeContext";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <ToastContainer />
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
