"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";

const MobileMenu: React.FC = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="w-14 md:hidden">
        <button
          id="menu-toggle"
          onClick={() => setMenu(!menu)}
          className="text-2xl text-primary focus:outline-none"
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {menu ? (
            <Icon icon="mingcute:close-line" aria-hidden="true" />
          ) : (
            <Icon icon="mdi:menu" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Logo for mobile */}
      <div className="md:hidden">
        <a
          href="/"
          className="text-2xl font-bold text-primary"
          aria-label="نمرتك - Home"
        >
          نمرتك
        </a>
      </div>

      {/* Cart and Save buttons */}
      <div className="flex space-x-4">
        <a
          href="#"
          className="text-2xl text-primary hover:text-foreground"
          aria-label="Cart"
        >
          <Icon icon="bx:bxs-cart" aria-hidden="true" />
        </a>
        <a
          href="#"
          className="text-2xl text-primary hover:text-foreground"
          aria-label="Save for later"
        >
          <Icon icon="bx:bxs-bookmark" aria-hidden="true" />
        </a>
      </div>
      {/* Mobile Menu */}
      <div
        style={{ right: menu ? "0" : "-100vw" }}
        className="fixed top-[63px] z-20 flex h-[calc(100dvh-50px)] w-screen justify-start bg-white p-4 duration-300 ease-in-out md:hidden"
        id="mobile-menu"
        role="menu"
        aria-label="Mobile navigation"
      >
        <a
          href="#home"
          className="block px-4 py-2 text-sm text-primary hover:bg-gray-700 hover:text-white"
          aria-label="Home"
        >
          الرئيسية
        </a>
        <a
          href="#about"
          className="block px-4 py-2 text-sm text-primary hover:bg-gray-700 hover:text-white"
          aria-label="About Us"
        >
          عن الشركة
        </a>
        <a
          href="#services"
          className="block px-4 py-2 text-sm text-primary hover:bg-gray-700 hover:text-white"
          aria-label="Special Numbers"
        >
          الأرقام المميزة
        </a>
        <a
          href="#portfolio"
          className="block px-4 py-2 text-sm text-primary hover:bg-gray-700 hover:text-white"
          aria-label="Portfolio"
        >
          المعرض
        </a>
        <a
          href="#contact"
          className="block px-4 py-2 text-sm text-primary hover:bg-gray-700 hover:text-white"
          aria-label="Contact Us"
        >
          اتصل بنا
        </a>
      </div>
    </>
  );
};

export default MobileMenu;
