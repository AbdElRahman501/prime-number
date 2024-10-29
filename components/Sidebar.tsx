"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
    name: "العروض",
    path: "/dashboard/offers",
    icon: "mdi:tag",
  },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);
  const pathname = usePathname();
  const curentPage = pathname.split("/").pop();

  // const desckClass = ` ${isOpen ? "w-64" : "w-20"}  sticky top-24 m-2 flex h-[calc(100vh-104px)] flex-col rounded-3xl bg-primary p-4 text-background duration-300`
  // const mobileClass = ` ${isOpen ? "w-64" : "w-20"}  m-2 flex h-[calc(100vh-104px)] flex-col rounded-3xl bg-primary p-4 text-background duration-300`

  return (
    <>
      <aside
        className={` ${isOpen ? "w-64" : "-right-24 w-20 md:right-auto"} fixed top-[86px] z-20 m-2 flex h-[calc(100dvh-104px)] flex-col rounded-3xl bg-primary p-4 text-background duration-300 md:sticky`}
      >
        <h2
          className={`${isOpen ? "" : "hidden"} z-10 mb-6 text-2xl font-bold`}
        >
          لوحة التحكم
        </h2>
        <nav className="flex h-full flex-col gap-4">
          {SidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={closeSidebar}
              className={`${curentPage === link.path.split("/").pop() ? "" : "opacity-50"} flex items-center gap-2 rounded p-2 hover:bg-gray-700`}
            >
              <Icon icon={link.icon} width={34} />
              <span className={isOpen ? "" : "hidden"}>{link.name}</span>
            </Link>
          ))}
        </nav>
        <div
          className={`${isOpen ? "translate-x-0" : "-translate-x-20"} flex w-full justify-end duration-1000 md:translate-x-0`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? "rotate-0 bg-background text-primary" : "rotate-180 bg-primary text-background"} flex h-[50px] w-[50px] items-center justify-center rounded-full text-3xl transition-transform duration-1000 md:static md:bg-background md:text-primary`}
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
