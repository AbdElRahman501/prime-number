import Link from "next/link";
import LogoIcon from "./LogoIcon";
import MobileMenu from "./MobileMenu";
import SearchField from "./SearchField";
import { Suspense } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Cart from "./Cart";
import SessionElement from "./SessionElement";
import { createWhatsAppLink } from "@/utils";
import { headerLinks } from "@/constants";
import { fetchStore } from "@/lib/actions/store.actions";

export const preload = () => {
  void fetchStore();
};

const Header: React.FC = async () => {
  const store = await fetchStore();
  return (
    <header
      id="header"
      aria-label="Header"
      className="sticky top-0 z-50 bg-background"
    >
      <nav
        className="container mx-auto flex items-center justify-between gap-3 p-4 px-5"
        role="navigation"
        aria-label="Main Navigation"
      >
        <MobileMenu store={store} />

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
          {headerLinks.map((link) => (
            <Link
              key={link._id}
              href={link.url}
              className="text-nowrap hover:text-foreground"
              aria-label={link.title}
            >
              {link.title}
            </Link>
          ))}
          <SessionElement>
            <Link
              href="/dashboard"
              className="text-nowrap hover:text-foreground"
            >
              لوحة التحكم
            </Link>
          </SessionElement>
          <Link
            target="_blank"
            href={createWhatsAppLink(store.contacts.phoneNumber)}
            className="text-nowrap hover:text-foreground"
            aria-label="تواصل معنا عبر الواتساب"
          >
            اتصل بنا
          </Link>
        </div>

        {/* Cart and Save buttons */}
        <div className="flex gap-4">
          <Suspense
            fallback={
              <div className="relative" aria-busy>
                <div
                  aria-label="Open cart"
                  className="text-2xl text-primary hover:text-foreground sm:text-3xl"
                >
                  <Icon icon="solar:bag-bold" aria-hidden="true" />
                </div>
              </div>
            }
          >
            <Cart store={store} />
          </Suspense>
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
