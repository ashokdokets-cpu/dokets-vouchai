import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VouchAI - Trust in Every Deal",
  description: "AI-Powered Micro-Escrow Platform for the Global Informal Economy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}