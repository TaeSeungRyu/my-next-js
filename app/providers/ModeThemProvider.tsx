"use client";
import { ThemeProvider } from "next-themes";

export default function ModeThemProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
