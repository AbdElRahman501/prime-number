import ActionButtons from "@/components/ActionButtons";
import { CustomTable } from "@/components/CustomTable";
import { fetchProducts } from "@/lib/actions/product.actions";
import { Column, PhoneNumber } from "@/types";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const limit = 10;
  const currentPage = parseInt((searchParams?.page || "1").toString());
  const sort = searchParams?.sort as "asc" | "desc" | undefined;
  const sortBy = searchParams?.sortBy as keyof PhoneNumber | undefined;

  const { phoneNumbers, totalProducts } = await fetchProducts(
    currentPage,
    limit,
    sort,
    sortBy,
  );

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-3xl font-bold">المنتجات</h1>
      <CustomTable
        searchParams={searchParams}
        data={phoneNumbers}
        columns={columns}
        name="product"
        pages={totalPages === 1 ? undefined : totalPages}
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
          <p>#{String(item._id).slice(0, 5)}</p>
        </Link>
      );
    },
  },
  { key: "active", label: "الحالة", type: "boolean" },
  { key: "name", label: "الاسم" },
  { key: "phoneNumber", label: "رقم الهاتف" },
  { key: "company", label: "الشركة" },
  { key: "price", label: "السعر" },
  { key: "category", label: "التصنيف" },
  { key: "score", label: "التقييم" },
  {
    label: "تعديل",
    type: "action",
    // TODO : make it clint side with faster interaction
    RowAction: (item) => <ActionButtons name="product" id={item._id} />,
  },
];
