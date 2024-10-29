import {
  areAllItemsSelected,
  getSort,
  isSelected,
  searchInData,
  sortByKey,
} from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import SearchField from "./SearchField";
import { Column } from "@/types";
import Pagination from "./Pagination";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchParams?: { [key: string]: string | string[] | undefined };
  pages?: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomTable<T extends { _id: string } & Record<string, any>>({
  data,
  columns,
  searchParams,
  pages,
}: TableProps<T>) {
  const sort: "asc" | "desc" | undefined = searchParams?.sort as "asc" | "desc";
  const sortBy: keyof T | undefined = searchParams?.sortBy as keyof T;
  const query: string | undefined = searchParams?.q as string;
  const selected: string | undefined = searchParams?.sed as string;
  const selectedItems = selected ? selected?.split(",") : [];

  let areAllSelected = searchParams?.sedAll as string;
  areAllSelected = areAllItemsSelected(data, selectedItems);

  const currentPage = (searchParams?.page || "1") as string;
  return (
    <div className="scroll-bar-hidden relative overflow-x-auto rounded-3xl bg-white p-5">
      <div className="w-fit">
        <SearchField />
      </div>
      <table className="min-w-full border-collapse divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="cursor-pointer px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-primary">
              <Link
                href={{
                  query: {
                    ...searchParams,
                    sed:
                      areAllSelected === "true"
                        ? ""
                        : data.map((item) => item._id).join(","),
                    sedAll: areAllSelected === "true" ? "false" : "true",
                  },
                }}
                scroll={false}
              >
                {areAllSelected === "true"
                  ? "الغاء التحديد الكل"
                  : "تحديد الكل"}
              </Link>
            </th>
            {columns?.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-primary"
              >
                {/* AddParamLink */}
                {column.key ? (
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        sort: getSort(sortBy, column.key, sort),
                        sortBy: String(column.key),
                      },
                    }}
                    scroll={false}
                    className="cursor-pointer hover:underline"
                  >
                    {column.label}
                  </Link>
                ) : (
                  <span>{column.label}</span>
                )}
                {/* Add icons here to show sort direction */}
                {sortBy && sortBy === column.key && (
                  <Icon
                    icon={
                      sort === "asc" ? "mdi:chevron-up" : "mdi:chevron-down"
                    }
                    className="inline text-lg"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortByKey(searchInData(data, query), sortBy, sort).map(
            (item, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4">
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        sed: isSelected(selectedItems, item._id)
                          ? selectedItems
                              .filter((id) => id !== item._id)
                              .join(",")
                          : [...selectedItems, item._id].join(","),
                        sedAll: areAllItemsSelected(data, [
                          ...selectedItems,
                          item._id,
                        ])
                          ? "true"
                          : "false",
                      },
                    }}
                    scroll={false}
                  >
                    <div
                      className={`${isSelected(selectedItems, item._id) ? "bg-primary" : ""} h-5 w-5 rounded-md border border-primary`}
                    ></div>
                  </Link>
                </td>
                {columns?.map((column) => (
                  <Cell
                    key={String(column.label)}
                    item={item}
                    column={column}
                  />
                ))}
              </tr>
            ),
          )}
        </tbody>
        {pages && (
          <tfoot>
            {/* add pages */}

            <tr>
              <td colSpan={columns && columns.length + 1}>
                <Pagination
                  currentPage={parseInt(currentPage)}
                  totalPages={pages}
                  searchParams={searchParams}
                />
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

interface CellProps<T> {
  item: T;
  column: Column<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Cell<T extends Record<string, any>>({
  item,
  column,
}: CellProps<T>) {
  const { key } = column;
  switch (column.type) {
    case "boolean":
      return (
        key && (
          <td className="whitespace-nowrap px-6 py-4">
            {item[key] ? "Yes" : "No"}
          </td>
        )
      );
    case "image":
      return (
        key && (
          <td className="whitespace-nowrap px-6 py-4">
            <Image
              width={50}
              height={50}
              src={item[key] as string}
              alt={item[key] as string}
              className="h-10 w-10 rounded-full"
            />
          </td>
        )
      );
    case "action":
      const { RowAction } = column;
      return (
        <td className="whitespace-nowrap px-6 py-4">
          {RowAction ? <RowAction {...item} /> : null}
        </td>
      );
    default:
      return (
        key && (
          <td className="whitespace-nowrap px-6 py-4">
            {typeof item[key] === "string"
              ? item[key]
              : JSON.stringify(item[key])}
          </td>
        )
      );
  }
}
