"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import LogoIcon from "./LogoIcon";

const MobileMenu: React.FC = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        id="menu-toggle"
        onClick={() => setMenu(!menu)}
        className="w-[56px] text-2xl text-primary focus:outline-none sm:w-[76px] sm:text-3xl md:hidden"
        aria-expanded="false"
        aria-controls="mobile-menu"
        aria-label="Toggle menu"
      >
        {menu ? (
          <Icon icon="mingcute:close-fill" aria-hidden="true" />
        ) : (
          <Icon icon="mingcute:menu-fill" aria-hidden="true" />
        )}
      </button>

      {/* Logo for mobile */}
      <div className="md:hidden">
        <Link href="/" className="block w-fit" aria-label="نمرتك - Home">
          <LogoIcon className="w-24 text-primary" />
        </Link>
      </div>

      {/* Cart and Save buttons */}
      <div className="flex gap-4">
        <a
          href="#"
          className="text-2xl text-primary hover:text-foreground sm:text-3xl"
          aria-label="Cart"
        >
          <Icon icon="solar:bag-bold" aria-hidden="true" />
        </a>
        <a
          href="#"
          className="text-2xl text-primary hover:text-foreground sm:text-3xl"
          aria-label="Save for later"
        >
          <Icon icon="mdi:bookmark" aria-hidden="true" />
        </a>
      </div>
      {/* Mobile Menu */}
      {menu && (
        <button
          onClick={() => setMenu(false)}
          aria-label="Close menu"
          aria-hidden="true"
          aria-controls="mobile-menu"
          className="fixed inset-0 top-[76px] h-[calc(100dvh-50px)] w-screen bg-black/30 backdrop-blur-sm duration-700 md:hidden"
        ></button>
      )}
      <div
        style={
          menu
            ? { right: "10px", height: "50vh", width: "70vw" }
            : { right: "-20vw", height: "0", width: "0", top: "0" }
        }
        className="fixed top-[86px] z-20 flex h-[50vh] w-[70vw] flex-col justify-start overflow-hidden rounded-[50px] bg-primary p-5 text-background duration-700 ease-in-out md:hidden"
        id="mobile-menu"
        role="menu"
        aria-label="Mobile navigation"
      >
        <Link
          role="menuitem"
          href="/"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="Home - الرئيسية"
        >
          الرئيسية
        </Link>
        <Link
          role="menuitem"
          href="/shop"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="Shop - المتجر"
        >
          المتجر
        </Link>
        <Link
          role="menuitem"
          href="#about"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="About Us"
        >
          عن الشركة
        </Link>
        <Link
          role="menuitem"
          href="#services"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="Special Numbers"
        >
          الأرقام المميزة
        </Link>
        <Link
          role="menuitem"
          href="#portfolio"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="Portfolio"
        >
          المعرض
        </Link>
        <Link
          role="menuitem"
          href="#contact"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="Contact Us"
        >
          اتصل بنا
        </Link>
      </div>
    </>
  );
};

export default MobileMenu;
