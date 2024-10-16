import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

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
      <body className="font-rubik antialiased">{children}</body>
    </html>
  );
}
