import type { Metadata } from "next";
import { Rubik, Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { NextAuthProvider } from "@/NextAuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P759KG7P');`,
          }}
        ></Script>
      </head>
      <body className="antialiased">
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

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P759KG7P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
