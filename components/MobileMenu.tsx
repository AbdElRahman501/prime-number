"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const MobileMenu: React.FC = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (menu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menu]);

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

      {/* Mobile Menu */}
      <div
        onClick={() => setMenu(false)}
        aria-hidden="true"
        className={`${menu ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-[76px] h-[calc(100dvh-50px)] w-screen bg-black/30 backdrop-blur-sm duration-700 md:hidden`}
      ></div>

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
          aria-label="الأرقام المميزة - Special Numbers"
        >
          الأرقام المميزة
        </Link>
        <Link
          role="menuitem"
          href="/about"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="من نحن- About Us"
        >
          من نحن
        </Link>
        <Link
          role="menuitem"
          href="#contact"
          className="block px-4 py-2 hover:bg-foreground hover:text-primary"
          aria-label="اتصل بنا - Contact Us"
        >
          اتصل بنا
        </Link>
      </div>
    </>
  );
};

export default MobileMenu;
