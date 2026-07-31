import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VouchAI - Trust in Every Deal",
  description: "AI-Powered Micro-Escrow Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}