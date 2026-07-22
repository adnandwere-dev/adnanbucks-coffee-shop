"use client";

import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/lib/store";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}