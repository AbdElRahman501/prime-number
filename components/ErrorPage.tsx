import React from "react";
import Link from "next/link";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-background pb-32 text-primary">
      <h1 className="text-6xl font-bold md:text-9xl">404</h1>
      <h2 className="text-xl font-bold">حدث خطأ ما</h2>
      <p>عذراً، هذه الصفحة غير موجودة.</p>

      <Link
        href="/"
        replace
        className="my-5 rounded-lg bg-primary px-4 py-2 text-center uppercase text-white hover:bg-white hover:text-black"
        aria-label="Return to the homepage"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default ErrorPage;
