"use client";
import { createUrl } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ActionButtons = ({
  name,
  id,
}: {
  name?: "product" | "offer";
  id: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const editPathName = `edit${name || ""}Id`;
  const removePathName = `remove${name || ""}Id`;

  const edit = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(editPathName, id);
    newSearchParams.delete(removePathName);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  const remove = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(removePathName, id);
    newSearchParams.delete(editPathName);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={edit}
        className="text-primary hover:text-blue-500 hover:underline"
      >
        <Icon icon="bxs:edit" className="text-2xl" />
      </button>
      <button
        onClick={remove}
        className="text-primary hover:text-red-500 hover:underline"
      >
        <Icon icon="solar:trash-bin-trash-bold" className="text-2xl" />
      </button>
    </div>
  );
};

export default ActionButtons;
