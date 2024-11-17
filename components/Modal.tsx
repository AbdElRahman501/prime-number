"use client";
import { useEffect } from "react";

const Modal: React.FC<{
  isOpen: boolean;
  scrollLock?: boolean;
  children: React.ReactNode;
}> = ({ isOpen, scrollLock, children }) => {
  useEffect(() => {
    if (scrollLock) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [scrollLock]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 top-[76px] z-30 flex h-[calc(100dvh-50px)] w-screen items-center justify-center bg-black/30 p-4 py-14 backdrop-blur-sm">
      <div className="m-5 flex max-h-full flex-col items-center justify-between gap-2 overflow-y-auto rounded-3xl bg-white p-5">
        {children}
      </div>
    </div>
  );
};

export default Modal;
