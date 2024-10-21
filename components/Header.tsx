import Link from "next/link";
import LogoIcon from "./LogoIcon";
import MobileMenu from "./MobileMenu";
import SearchField from "./SearchField";
import { Suspense } from "react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav
        className="container mx-auto flex items-center justify-between gap-3 p-4 px-5"
        role="navigation"
        aria-label="Primary"
      >
        {/* Logo for desktop */}
        <div className="hidden md:block">
          <Link href="/" className="block w-fit" aria-label="نمرتك - Home">
            <LogoIcon className="w-24 text-primary" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden text-sm md:block lg:text-base">
          <Suspense>
            <SearchField />
          </Suspense>
        </div>

        {/* Navigation links */}
        <div className="hidden gap-3 text-sm font-semibold text-primary md:flex lg:gap-8 lg:text-base">
          <Link
            href="/"
            className="hover:text-foreground"
            aria-label="الرئيسية - Home"
          >
            الرئيسية
          </Link>
          <Link
            href="/shop"
            className="hover:text-foreground"
            aria-label="الأرقام المميزة - Special Numbers"
          >
            الأرقام المميزة
          </Link>
          <Link
            href="#about"
            className="hover:text-foreground"
            aria-label="عن الشركة - About Us"
          >
            عن الشركة
          </Link>
          <Link
            href="#contact"
            className="hover:text-foreground"
            aria-label="اتصل بنا - Contact Us"
          >
            اتصل بنا
          </Link>
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
};

export default Header;
