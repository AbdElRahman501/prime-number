import { generatePageNumbers } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  searchParams,
}) => {
  return (
    <div className="mt-4 flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <Link
        href={{
          query: {
            ...searchParams,
            page: currentPage - 1 >= 1 ? currentPage - 1 : currentPage,
          },
        }}
        className={`${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""} px-3 py-1 text-xl font-semibold text-primary duration-300 hover:scale-105`}
      >
        <Icon icon="mdi:chevron-right" />
      </Link>

      {/* Page Numbers */}
      {generatePageNumbers(currentPage, totalPages).map((page) => (
        <Link
          href={{
            query: {
              ...searchParams,
              page,
            },
          }}
          key={page}
          className={`rounded-md px-3 py-1 text-sm font-semibold text-primary ${
            currentPage === page ? "" : "opacity-50 hover:scale-105"
          } ${page === "..." ? "cursor-not-allowed opacity-50" : ""} `}
        >
          {page}
        </Link>
      ))}

      {/* Next Button */}

      <Link
        href={{
          query: {
            page: currentPage + 1 <= totalPages ? currentPage + 1 : currentPage,
          },
        }}
        className={`${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""} px-3 py-1 text-xl font-semibold text-primary duration-300 hover:scale-105`}
      >
        <Icon icon="mdi:chevron-left" />
      </Link>
    </div>
  );
};

export default Pagination;
