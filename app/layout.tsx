import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { NextAuthProvider } from "@/NextAuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import LocalStorage from "@/components/LocalStorage";

// Load fonts with selected weights and subsets
const rubik = Rubik({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin", "arabic"],
});

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

// Dynamically load Footer component with client-side rendering
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export const metadata: Metadata = {
  title: "بريم نمبر - أرقام مميزة في مصر",
  description:
    "احصل على أفضل الأرقام المميزة في مصر بسهولة. تصفح، احفظ، واشترِ أرقام هاتف مميزة مباشرة من خلال واتساب. بريم نمبر هو وجهتك للأرقام الفريدة التي تناسب احتياجاتك.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${rubik.className} ${inter.variable}`} // Combining Rubik and Inter fonts
    >
      <GoogleTagManager gtmId="GTM-P759KG7P" />
      <body className="antialiased">
        <LocalStorage />
        {/* Header Component */}
        <NextAuthProvider>
          <Header />
        </NextAuthProvider>

        {/* Main Content Area */}
        {children}

        {/* Footer Component */}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
