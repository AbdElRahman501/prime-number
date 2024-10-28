import Link from "next/link";
import LogoIcon from "./LogoIcon";
import MobileMenu from "./MobileMenu";
import SearchField from "./SearchField";
import { Suspense } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cart from "./Cart";
import SessionElement from "./SessionElement";
import { createWhatsAppLink } from "@/utils";
import { store } from "@/constants";

const Header: React.FC = () => {
  return (
    <header
      id="header"
      role="header"
      aria-label="Header"
      className="sticky top-0 z-50 bg-background"
    >
      <nav
        className="container mx-auto flex items-center justify-between gap-3 p-4 px-5"
        role="navigation"
        aria-label="navigation"
      >
        <MobileMenu />

        <div>
          <Link href="/" className="block w-fit" aria-label="نمرتك - Home">
            <LogoIcon className="w-24 text-primary" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden text-sm md:block lg:text-base">
          <Suspense>
            <SearchField pathname="/shop" />
          </Suspense>
        </div>

        {/* Navigation links */}
        <div className="hidden gap-3 text-sm font-semibold text-primary md:flex lg:gap-8 lg:text-base">
          <Link
            href="/"
            className="text-nowrap hover:text-foreground"
            aria-label="الرئيسية - Home"
          >
            الرئيسية
          </Link>
          <SessionElement>
            <Link
              href="/dashboard"
              className="text-nowrap hover:text-foreground"
              aria-label="لوحة التحكم - Dashboard"
            >
              لوحة التحكم
            </Link>
          </SessionElement>
          <Link
            href="/shop"
            className="text-nowrap hover:text-foreground"
            aria-label="الأرقام المميزة - Special Numbers"
          >
            الأرقام المميزة
          </Link>
          <Link
            href="/about"
            className="text-nowrap hover:text-foreground"
            aria-label="من نحن- About Us"
          >
            من نحن
          </Link>
          <Link
            target="_blank"
            href={createWhatsAppLink(store.phoneNumber)}
            className="text-nowrap hover:text-foreground"
            aria-label="اتصل بنا - Contact Us"
          >
            اتصل بنا
          </Link>
        </div>

        {/* Cart and Save buttons */}
        <div className="flex gap-4">
          <Cart />
          <Link
            href="/wishlist"
            className="text-2xl text-primary hover:text-foreground sm:text-3xl"
            aria-label="Save for later"
          >
            <Icon icon="mdi:bookmark" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
