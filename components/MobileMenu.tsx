"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import SessionElement from "./SessionElement";
import { headerLinks } from "@/constants";
import { createWhatsAppLink } from "@/utils";
import SearchField from "./SearchField";
import { usePathname } from "next/navigation";
import { Store } from "@/types";

const MobileMenu: React.FC<{ store: Store }> = ({ store }) => {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();

  useEffect(() => {
    if (menu) {
      document.body.classList.add("max-md:overflow-hidden");
    } else {
      document.body.classList.remove("max-md:overflow-hidden");
    }
    return () => {
      document.body.classList.remove("max-md:overflow-hidden");
    };
  }, [menu]);

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setMenu((prevState) => !prevState)}
        aria-expanded={menu}
        className="group w-[56px] text-2xl text-primary focus:outline-none sm:w-[76px] sm:text-3xl md:hidden"
        aria-label={menu ? "Close menu" : "Open menu"}
      >
        <svg
          className="pointer-events-none"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
          />
          <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
          />
        </svg>
      </button>

      {/* Mobile menu backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`${menu ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-[76px] h-[calc(100dvh-50px)] w-screen bg-black/30 backdrop-blur-sm duration-700 md:hidden`}
      ></div>

      <div
        style={
          menu
            ? { right: "10px", height: "50vh", width: "70vw" }
            : { right: "-20vw", height: "0", width: "0", top: "0" }
        }
        className="fixed top-[86px] z-20 flex h-[50vh] w-[70vw] overflow-hidden rounded-[50px] bg-primary text-background duration-700 ease-in-out md:hidden"
        id="mobile-menu"
        aria-label="Mobile navigation"
      >
        <div className="scroll-bar-hidden flex min-h-[50vh] min-w-[70vw] flex-col justify-start overflow-y-auto p-5">
          {/* Search bar */}
          <div className="mb-6 text-sm text-primary selection:bg-blue-300 selection:text-primary">
            <Suspense>
              <SearchField pathname="/shop" onClick={closeMenu} />
            </Suspense>
          </div>

          {headerLinks.map((link) => (
            <Link
              key={link._id}
              onClick={closeMenu}
              className={`${currentPage === link.url.split("/").pop() ? "" : "opacity-50"} block px-4 py-2 hover:bg-foreground hover:text-primary`}
              href={link.url}
            >
              {link.title}
            </Link>
          ))}
          <SessionElement>
            <Link href="/dashboard" aria-label="لوحة التحكم - Dashboard">
              <div
                onClick={closeMenu}
                className={`${currentPage === "dashboard" ? "" : "opacity-50"} block px-4 py-2 hover:bg-foreground hover:text-primary`}
              >
                لوحة التحكم
              </div>
            </Link>
          </SessionElement>
          <Link
            target="_blank"
            href={createWhatsAppLink(store.contacts.phoneNumber)}
            aria-label="تواصل معنا عبر الواتساب"
          >
            <div
              onClick={closeMenu}
              className="block px-4 py-2 opacity-50 hover:bg-foreground hover:text-primary focus:opacity-100"
            >
              اتصل بنا
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
