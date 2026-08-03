import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GlobalNav from "@/components/GlobalNav";

export const metadata: Metadata = {
  title: "VouchAI - Trust in Every Deal",
  description: "AI-Powered Micro-Escrow Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <GlobalNav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}