import { Icon } from "@iconify/react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="bg-background">
      <nav
        className="container sticky top-0 mx-auto flex justify-between items-center p-4 gap-3"
        role="navigation"
        aria-label="Primary"
      >
        {/* Logo for desktop */}
        <div className="hidden md:block">
          <a
            href="/"
            className="text-primary text-4xl font-bold"
            aria-label="نمرتك - Home"
          >
            نمرتك
          </a>
        </div>

        {/* Search bar */}
        <div className="hidden md:block text-sm lg:text-base">
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
                className="peer w-full lg:w-80 pl-10 pr-4 py-2 border border-foreground rounded-full focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="text-foreground peer-focus:text-primary absolute inset-y-0 left-0 pl-3 flex items-center"
              >
                <Icon icon="akar-icons:search" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex gap-3 lg:gap-8 text-primary text-sm lg:text-base font-semibold">
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
