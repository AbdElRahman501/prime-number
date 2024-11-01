import { Column } from "@/types";
import Image from "next/image";

interface CellProps<T> {
  item: T;
  column: Column<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableCell<T extends Record<string, any>>({
  item,
  column,
}: CellProps<T>) {
  const { key } = column;
  switch (column.type) {
    case "boolean":
      return (
        // TODO add edit function then applied here to just edit the value of the key only
        key && (
          <td className="whitespace-nowrap px-6 py-4">
            <div
              className={`${item[key] ? "justify-end bg-green-500" : "justify-start bg-red-500"} flex h-6 w-12 items-center rounded-full p-1`}
            >
              <div className="h-4 w-4 rounded-full bg-white"></div>
            </div>
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
