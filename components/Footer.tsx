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
      <div className="max-w-8xl mx-auto flex flex-col gap-5 rounded-t-[50px] bg-primary px-5 py-5 text-background md:rounded-t-[75px] md:px-20">
        <div className="flex grid-cols-3 flex-col gap-5 px-5 py-5 md:grid">
          {footerList.map((item, index) => (
            <div key={index} className="group flex flex-col gap-1">
              <h1 className="text-2xl font-medium text-white">{item.title}</h1>
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
                    {link.title}
                  </div>
                </Link>
              ))}
            </div>
          ))}
          <div className="group flex flex-col gap-1">
            <h1 className="text-2xl font-medium text-white">
              مواقع التواصل الاجتماعي
            </h1>
            <div className="flex gap-3">
              {socialMedia.map((link, index) => (
                <Link
                  href={link.url}
                  key={index}
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

          <div className="flex flex-col items-center gap-2">
            <GoUpButton />
            <p className="text-base font-medium text-gray-500">
              @{currentYear} Prime Number! All Rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
