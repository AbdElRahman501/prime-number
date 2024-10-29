"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActionButtons = ({ name, id }: { name: string; id: string }) => {
  const pathName = usePathname();

  const editPathName = "edit" + name.toUpperCase() + "Id";
  const removePathName = "remove" + name.toUpperCase() + "Id";

  return (
    <div className="flex gap-2">
      <Link
        replace
        scroll={false}
        href={`${pathName}?${editPathName}=${id}`}
        className="text-primary hover:text-blue-500 hover:underline"
      >
        <Icon icon="bxs:edit" className="text-2xl" />
      </Link>
      <Link
        replace
        scroll={false}
        href={`${pathName}?${removePathName}=${id}`}
        className="text-primary hover:text-red-500 hover:underline"
      >
        <Icon icon="solar:trash-bin-trash-bold" className="text-2xl" />
      </Link>
    </div>
  );
};

export default ActionButtons;
