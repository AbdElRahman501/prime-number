import {
  areAllItemsSelected,
  getSort,
  isMobile,
  isSelected,
  removeDuplicates,
  searchInData,
  sortByKey,
  subtractArrays,
} from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import SearchField from "./SearchField";
import { Column } from "@/types";
import Pagination from "./Pagination";
import { headers } from "next/headers";
import RemoveModal from "./RemoveModal";
import TableCell from "./TableCell";

// TODO ; try to separate it into client side and server side for reduce of using search params

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchParams?: { [key: string]: string | string[] | undefined };
  pages?: number;
  name?: "product" | "offer";
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomTable<T extends { _id: string } & Record<string, any>>({
  data,
  columns,
  searchParams,
  pages,
  name,
}: TableProps<T>) {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  const sort: "asc" | "desc" | undefined = searchParams?.sort as "asc" | "desc";
  const sortBy: keyof T | undefined = searchParams?.sortBy as keyof T;
  const query: string | undefined = searchParams?.q as string;
  const selected: string | undefined = searchParams?.sed as string;
  const selectedItems = selected ? selected?.split(",") : [];

  const areAllSelected = areAllItemsSelected(data, selectedItems);

  const currentPage = (searchParams?.page || "1") as string;

  // const id = searchParams?.["edit" + name.toUpperCase() + "Id"] || "";
  // const item = data.find((item) => {
  //   return item._id === id;
  // });
  return (
    <>
      <RemoveModal name={name} />
      <div className="flex flex-col gap-5 overflow-hidden rounded-3xl bg-white p-5">
        <div className="w-full max-w-96">
          <SearchField />
        </div>
        <div
          className={`${mobileCheck ? "scroll-bar-hidden" : ""} relative overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-2`}
        >
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
                            ? subtractArrays(
                                selectedItems,
                                data.map((item) => item._id),
                              ).join(",")
                            : removeDuplicates([
                                ...selectedItems,
                                ...data.map((item) => item._id),
                              ]).join(","),
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
                      <TableCell
                        key={String(column.label)}
                        item={item}
                        column={column}
                      />
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
        {pages && (
          <div className="w-full">
            <Pagination
              currentPage={parseInt(currentPage)}
              totalPages={pages}
              searchParams={searchParams}
            />
          </div>
        )}
      </div>
    </>
  );
}
