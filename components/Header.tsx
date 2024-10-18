import { Icon } from "@iconify/react";
import Link from "next/link";
import LogoIcon from "./LogoIcon";
import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 bg-background">
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
          <form action="#" role="search" aria-label="Search form">
            <div className="relative">
              <label htmlFor="search" className="sr-only">
                بحث
              </label>
              <input
                type="text"
                id="search"
                aria-label="ابحث هنا"
                placeholder="ابحث هنا..."
                className="peer w-full rounded-full border border-foreground py-2 pl-10 pr-4 focus:border-primary focus:outline-none lg:w-80"
                required
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-foreground peer-focus:text-primary"
              >
                <Icon icon="akar-icons:search" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

        {/* Navigation links */}
        <div className="hidden gap-3 text-sm font-semibold text-primary md:flex lg:gap-8 lg:text-base">
          <a
            href="#home"
            className="hover:text-foreground"
            aria-label="الرئيسية - Home"
          >
            الرئيسية
          </a>
          <a
            href="#about"
            className="hover:text-foreground"
            aria-label="عن الشركة - About Us"
          >
            عن الشركة
          </a>
          <a
            href="#services"
            className="hover:text-foreground"
            aria-label="الأرقام المميزة - Special Numbers"
          >
            الأرقام المميزة
          </a>
          <a
            href="#contact"
            className="hover:text-foreground"
            aria-label="اتصل بنا - Contact Us"
          >
            اتصل بنا
          </a>
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
};

export default Header;
