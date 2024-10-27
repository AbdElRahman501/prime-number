"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const GoUpButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="m-5 animate-bounce">
      <button
        onClick={scrollToTop}
        className="m-[5px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-3xl text-black dark:text-black"
        aria-label="Scroll to top"
      >
        <Icon icon="bi:arrow-up" className="w-5" />
      </button>
    </div>
  );
};

export default GoUpButton;
