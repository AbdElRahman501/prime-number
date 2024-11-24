"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SignOutButton } from "./SessionElement";
import { addToLocalStorage, getFromLocalStorage } from "@/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SidebarLinks = [
  {
    name: "الرئيسية",
    path: "/dashboard",
    icon: "mdi:home",
  },
  {
    name: "المنتجات",
    path: "/dashboard/products",
    icon: "mdi:package-variant-closed",
  },
  {
    name: "المستخدمين",
    path: "/dashboard/users",
    icon: "mdi:account-group",
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
    name: "المحتوى",
    path: "/dashboard/content",
    icon: "mdi:content-paste",
  },
  {
    name: "الاعدادات",
    path: "/dashboard/settings",
    icon: "mdi:settings",
  },
];
const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setIsOpen(false);
        addToLocalStorage("sidebar", false);
      }
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    addToLocalStorage("sidebar", !isOpen);
  };
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();

  useEffect(() => {
    const locallySideBar =
      getFromLocalStorage("sidebar") === "true" ? true : false;
    setIsOpen(locallySideBar);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("max-md:overflow-hidden");
    } else {
      document.body.classList.remove("max-md:overflow-hidden");
    }
    return () => {
      document.body.classList.remove("max-md:overflow-hidden");
    };
  }, [isOpen]);
  return (
    <React.Fragment>
      <aside
        style={{}}
        className={` ${isOpen ? "" : "max-md:translate-x-[270px] md:right-auto md:w-20"} fixed top-[86px] z-20 m-2 flex h-[calc(100dvh-104px)] w-64 flex-col rounded-3xl bg-primary p-4 text-background transition-all duration-700 ease-in-out md:sticky`}
      >
        <nav className="scroll-bar-hidden flex h-full flex-col gap-4 overflow-y-auto">
          <Link
            href="/dashboard/account"
            onClick={closeSidebar}
            className="flex w-56 items-center gap-2 rounded hover:bg-gray-700"
          >
            <div className="w-12">
              <Image
                src={session?.user?.image || "/images/placeholder.jpg"}
                alt="user image"
                width={45}
                height={45}
                priority
                className={`${currentPage === "account" ? "border-white" : "border-white/50"} aspect-square rounded-full border-2 object-cover`}
              />
            </div>
            <div
              className={`${currentPage === "account" ? "" : "opacity-50"} flex flex-col`}
            >
              <span className="text-sm font-bold">{session?.user?.name}</span>
              <span className="min-w-40 break-all text-xs font-semibold text-gray-400">
                {session?.user?.email}
              </span>
            </div>
          </Link>
          {SidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={closeSidebar}
              className={`${currentPage === link.path.split("/").pop() ? "" : "opacity-50"} flex w-56 items-center gap-2 text-nowrap rounded p-2 hover:bg-gray-700`}
            >
              <div className="w-12">
                <Icon icon={link.icon} width={34} />
              </div>
              <span>{link.name}</span>
            </Link>
          ))}
          <SignOutButton>
            <div
              className={`flex w-56 items-center gap-2 text-nowrap rounded p-2 text-red-500 hover:bg-red-700 hover:text-white`}
            >
              <div className="w-12">
                <Icon icon="mdi:logout" width={34} />
              </div>
              <span>تسجيل الخروج</span>
            </div>
          </SignOutButton>
        </nav>
        <div
          className={`${isOpen ? "translate-x-0" : "-translate-x-20"} flex w-full justify-end duration-1000 md:translate-x-0`}
        >
          <button
            onClick={toggleSidebar}
            className={`${isOpen ? "rotate-0 bg-background text-primary" : "rotate-180 bg-primary text-background"} flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-background text-3xl transition-transform duration-1000 ease-in-out md:static md:bg-background md:text-primary`}
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
    </React.Fragment>
  );
};

export default Sidebar;
