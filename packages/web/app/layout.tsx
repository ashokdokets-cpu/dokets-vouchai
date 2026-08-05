import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GlobalNav from "@/components/GlobalNav";

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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3CG9X7GBJ6"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3CG9X7GBJ6');
          `
        }} />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <GlobalNav />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}