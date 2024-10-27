import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import GoUpButton from "./GoUpButton";
import { footerList, socialMedia } from "@/constants";
import LogoIcon from "./LogoIcon";

const currentYear = new Date().getFullYear(); // Moved outside the component

const Footer: React.FC = () => {
  return (
    <footer className="bg-background">
      <h2 id="features" className="sr-only">
        اكتشف أهم مزايا الأرقام الفريدة والمصممة لتلبية احتياجاتك الشخصية
        والتجارية
      </h2>
      <div className="rounded-t-[50px] bg-primary p-5 md:rounded-t-[75px]">
        <div className="container mx-auto flex flex-col gap-5 text-white">
          <div className="flex grid-cols-3 flex-col gap-5 p-5 md:grid">
            {footerList.map((item) => (
              <div key={item._id} className="group flex flex-col gap-1">
                <h3 className="text-2xl font-medium text-white">
                  {item.title}
                </h3>
                {item.links.map((link, linkIndex) => (
                  <Link
                    href={link.url}
                    key={linkIndex}
                    aria-label={link.title}
                    className="text-base font-medium opacity-60 duration-300 hover:!opacity-100 group-hover:opacity-40"
                  >
                    <div className="flex items-center gap-2">
                      {link.icon && (
                        <Icon icon={link.icon} className="text-2xl" />
                      )}
                      <p className="break-all">{link.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
            <div className="group flex flex-col gap-1">
              <h3 className="text-2xl font-medium text-white">
                مواقع التواصل الاجتماعي
              </h3>
              <div className="flex gap-3">
                {socialMedia.map((link) => (
                  <Link
                    href={link.url}
                    key={link._id}
                    aria-label={link.title}
                    className="text-base font-medium opacity-60 duration-300 hover:!opacity-100 group-hover:opacity-40"
                  >
                    {link.icon ? (
                      <Icon icon={link.icon} className="text-2xl" />
                    ) : (
                      link.title
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-5 px-5 py-2 md:flex-row">
            <Link
              href="/"
              className="flex items-center justify-center"
              aria-label="نمرتك - Home"
            >
              <LogoIcon className="w-60 max-w-[80%] text-background" />
            </Link>

            <div className="flex flex-col items-center gap-2 text-center">
              <GoUpButton />
              <p className="text-base font-medium opacity-60">
                All Rights reserved @{currentYear} Prime Number
              </p>
              <Link
                href="https://abdelrahman501.github.io/abdelrahman/"
                aria-label="developer - Abdel-Rahman Ahmed"
                className="text-base font-medium opacity-60 hover:underline"
              >
                Abdel-Rahman Ahmed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
