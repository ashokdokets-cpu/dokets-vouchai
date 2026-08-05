import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GlobalNav from "@/components/GlobalNav";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: "Dokets VouchAI - Trust in Every Deal | AI Micro-Escrow Platform",
  description: "AI-Powered Micro-Escrow Platform. Create contracts, secure payments, verify work via WhatsApp. 1% fee. 15+ currencies. Global.",
  icons: { icon: '/logo.jpeg' },
  keywords: "escrow, micro-escrow, AI contracts, WhatsApp payments, freelancer payment, secure payment India",
  openGraph: {
    title: "Dokets VouchAI - Trust in Every Deal",
    description: "AI-Powered Micro-Escrow Platform",
    url: "https://dokets.com",
    siteName: "Dokets VouchAI",
    locale: "en_US",
    type: "website",
  },
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
      <GoogleAnalytics gaId="G-7574958561" />
    </html>
  );
}