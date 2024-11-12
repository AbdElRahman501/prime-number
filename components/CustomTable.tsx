import {
  areAllItemsSelected,
  getSort,
  isMobile,
  isSelected,
  removeDuplicates,
  subtractArrays,
} from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import SearchField from "./SearchField";
import { Column } from "@/types";
import Pagination from "./Pagination";
import { headers } from "next/headers";
import TableCell from "./TableCell";
// TODO: try make it stand alone component
// add edit and remove states that will have the edit and remove items and have a close state that will close the modal
// and will have multiple edit and delete buttons
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  select?: boolean;
  search?: boolean;
  searchParams?: { [key: string]: string | string[] | undefined };
  pages?: number;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomTable<T extends { _id: string } & Record<string, any>>({
  data,
  columns,
  select = false,
  search = false,
  searchParams,
  pages,
}: TableProps<T>) {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  const sort: "asc" | "desc" | undefined = searchParams?.sort as "asc" | "desc";
  const sortBy: keyof T | undefined = searchParams?.sortBy as keyof T;
  const selected: string | undefined = searchParams?.sed as string;
  const selectedItems = selected ? selected?.split(",") : [];
  const areAllSelected = areAllItemsSelected(data, selectedItems);
  const currentPage = (searchParams?.page || "1") as string;

  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-3xl bg-white p-5">
      {search ? (
        <div className="w-full max-w-96">
          <SearchField />
        </div>
      ) : null}
      <div
        className={`${mobileCheck ? "scroll-bar-hidden" : ""} relative overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-2`}
      >
        <table className="min-w-full border-collapse divide-y divide-gray-200">
          <thead>
            <tr>
              {select ? (
                <th className="cursor-pointer text-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-primary">
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
              ) : null}
              {columns?.map((column) => (
                <th
                  key={String(column.key)}
                  className="text-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-primary"
                >
                  {/* AddParamLink */}
                  {column.key ? (
                    <Link
                      href={{
                        query: {
                          ...searchParams,
                          sort: getSort(sortBy, column.key, sort),
                          sortBy: String(column.key),
                          page: "1",
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
                  <Icon
                    icon={
                      sort === "asc" ? "mdi:chevron-up" : "mdi:chevron-down"
                    }
                    className={`${sortBy && sortBy === column.key ? "" : "invisible"} inline text-lg`}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item) => (
              <tr key={item._id}>
                {select ? (
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
                ) : null}
                {columns?.map((column) => (
                  <TableCell<T>
                    key={String(column.label)}
                    item={item}
                    column={column}
                  />
                ))}
              </tr>
            ))}
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
  );
}
