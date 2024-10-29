import ActionButtons from "@/components/ActionButtons";
import { CustomTable } from "@/components/CustomTable";
import { phoneNumbers } from "@/constants";
import { Column, PhoneNumber } from "@/types";
import Link from "next/link";

const page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-3xl font-bold">المنتجات</h1>
      <CustomTable
        searchParams={searchParams}
        data={phoneNumbers}
        columns={columns}
        pages={10}
      />
    </div>
  );
};

export default page;

const columns: Column<PhoneNumber>[] = [
  {
    key: "_id",
    label: "صفحة الهاتف",
    type: "action",
    RowAction(item) {
      return (
        <Link
          href={`/shop?q=${item.phoneNumber}`}
          className="cursor-pointer text-primary hover:underline"
        >
          <p>#{item._id.slice(0, 3)}</p>
        </Link>
      );
    },
  },
  { key: "name", label: "الاسم" },
  { key: "phoneNumber", label: "رقم الهاتف" },
  { key: "company", label: "الشركة" },
  { key: "price", label: "السعر" },
  {
    label: "تعديل",
    type: "action",
    RowAction: (item) => <ActionButtons name="review" id={item._id} />,
  },
];
