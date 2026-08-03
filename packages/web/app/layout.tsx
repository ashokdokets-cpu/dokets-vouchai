import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GlobalNav from "@/components/GlobalNav";

export const metadata: Metadata = {
  title: "Dokets VouchAI - Trust in Every Deal",
  description: "AI-Powered Micro-Escrow Platform for the Global Economy",
  icons: { icon: '/logo.jpeg' },
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