"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SignOutButton } from "./SessionElement";
import { addToLocalStorage, getFromLocalStorage } from "@/utils";

const SidebarLinks = [
  {
    name: "لوحة التحكم",
    path: "/dashboard",
    icon: "mdi:home",
  },
  {
    name: "المنتجات",
    path: "/dashboard/products",
    icon: "mdi:package-variant-closed",
  },
  {
    name: "العروض",
    path: "/dashboard/offers",
    icon: "mdi:tag",
  },
  {
    name: "اراء العملاء",
    path: "/dashboard/reviews",
    icon: "mdi:account-star",
  },
  {
    name: "الاعدادات",
    path: "/dashboard/settings",
    icon: "mdi:settings",
  },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => {
    setIsOpen(false);
    addToLocalStorage("sidebar", false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    addToLocalStorage("sidebar", !isOpen);
  };
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();
  // TODO check if mobile or desktop
  useEffect(() => {
    const locallySideBar =
      getFromLocalStorage("sidebar") === "true" ? true : false;
    setIsOpen(locallySideBar);
  }, []);
  return (
    <>
      <aside
        className={` ${isOpen ? "w-64" : "-right-24 w-20 md:right-auto"} fixed top-[86px] z-20 m-2 flex h-[calc(100dvh-104px)] flex-col rounded-3xl bg-primary p-4 text-background duration-300 md:sticky`}
      >
        <nav className="flex h-full flex-col gap-4 overflow-hidden">
          {SidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={closeSidebar}
              className={`${currentPage === link.path.split("/").pop() ? "" : "opacity-50"} flex w-fit items-center gap-2 text-nowrap rounded p-2 hover:bg-gray-700`}
            >
              <Icon icon={link.icon} width={34} />
              <span className={isOpen ? "" : "hidden"}>{link.name}</span>
            </Link>
          ))}
          <SignOutButton>
            <div
              className={`flex w-fit items-center gap-2 text-nowrap rounded p-2 text-red-500 hover:bg-red-700`}
            >
              <Icon icon="mdi:logout" width={34} />
              <span className={isOpen ? "" : "hidden"}>تسجيل الخروج</span>
            </div>
          </SignOutButton>
        </nav>
        <div
          className={`${isOpen ? "translate-x-0" : "-translate-x-20"} flex w-full justify-end duration-1000 md:translate-x-0`}
        >
          <button
            onClick={toggleSidebar}
            className={`${isOpen ? "rotate-0 bg-background text-primary" : "rotate-180 bg-primary text-background"} flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-background text-3xl transition-transform duration-1000 md:static md:bg-background md:text-primary`}
            aria-label="Scroll to top"
          >
            <Icon icon="bi:arrow-right" className="w-5" />
          </button>
        </div>
      </aside>
      {/* Mobile menu backdrop */}
      <div
        onClick={closeSidebar}
        aria-hidden="true"
        className={`${isOpen ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 top-[76px] z-10 h-[calc(100dvh-50px)] w-screen bg-black/30 backdrop-blur-sm duration-700 md:hidden`}
      ></div>
    </>
  );
};

export default Sidebar;
