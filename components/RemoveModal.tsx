"use client";
import { createUrl, modalKey } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import LoadingDots from "./loading-dots";
import { Result } from "@/types";

interface SwitchProps<T> {
  name?: "product" | "offer";
  item?: T;
  children: React.ReactNode;
  action: (item: T) => Promise<Result>;
}

export default function RemoveModal<T>({
  name,
  item,
  action,
  children,
}: SwitchProps<T>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const key = modalKey("remove", name);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const close = () => {
    setError("");
    setLoading(false);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  if (!item) return null;
  return (
    <div className="fixed inset-0 top-[76px] z-30 flex h-[calc(100dvh-50px)] w-screen items-center justify-center bg-black/30 p-5 backdrop-blur-sm duration-300">
      <div className="flex flex-col items-center justify-between gap-2 rounded-3xl bg-white p-5">
        {children}

        <p className="text-sm text-red-500">{error}</p>
        <div className="flex w-full justify-center gap-2">
          <button
            onClick={close}
            className="mt-4 w-full max-w-[200px] rounded-3xl border-2 border-primary py-4 text-center font-semibold text-primary focus:outline-none focus:ring focus:ring-inset focus:ring-orange-400"
          >
            الغاء
          </button>
          <button
            type="button"
            className="mt-4 flex w-full max-w-[200px] items-center justify-center rounded-3xl border-2 border-background bg-red-500 py-4 font-semibold text-background focus:outline-none focus:ring focus:ring-inset focus:ring-red-300"
            onClick={async () => {
              setLoading(true);
              if (action) {
                const result = await action(item);
                if (result.success) {
                  close();
                } else {
                  setError(result.message);
                }
              }
              setLoading(false);
            }}
          >
            {loading ? <LoadingDots className="text-2xl" /> : "احذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
