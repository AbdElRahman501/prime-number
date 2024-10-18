import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

const rubik = Rubik({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

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
    <html lang="ar" dir="rtl" className={rubik.variable}>
      <body className="font-rubik antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
