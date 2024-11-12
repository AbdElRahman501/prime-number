import ActionButtons from "@/components/ActionButtons";
import { CustomTable } from "@/components/CustomTable";
import Modal from "@/components/Modal";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";
import RemoveModal from "@/components/RemoveModal";
import {
  deleteProductById,
  fetchProducts,
  updateProductById,
} from "@/lib/actions/product.actions";
import { Column, PhoneNumber } from "@/types";
import { getActionItems, modalKey } from "@/utils";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const limit = 8;
  const currentPage = parseInt((searchParams?.page || "1").toString());
  const sort = searchParams?.sort as "asc" | "desc" | undefined;
  const sortBy = searchParams?.sortBy as keyof PhoneNumber | undefined;
  const query = searchParams?.q as string;

  const { phoneNumbers, totalProducts } = await fetchProducts({
    page: currentPage,
    limit,
    sort,
    sortBy,
    query,
  });

  const totalPages = Math.ceil(totalProducts / limit);

  const { editItem, removeItem, isAddItem } = getActionItems<PhoneNumber>(
    phoneNumbers,
    searchParams,
  );

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">المنتجات</h1>
        <Link
          href={{
            query: {
              ...searchParams,
              [modalKey("add")]: "true",
            },
          }}
          className="self-end rounded-md bg-primary px-4 py-2 text-white"
        >
          add new
        </Link>
      </div>
      <Modal isOpen={!!isAddItem}>
        <ProductForm />
      </Modal>
      <Modal isOpen={!!editItem}>
        <ProductForm item={editItem} />
      </Modal>
      <RemoveModal item={removeItem} action={deleteProductById}>
        <div className="min-w-[70vw] md:min-w-[350px]">
          <p>هل انت متاكد من حذف هذا المنتج ؟</p>
          <ProductCard {...(removeItem as PhoneNumber)} />
        </div>
      </RemoveModal>
      <CustomTable
        data={phoneNumbers}
        search
        searchParams={searchParams}
        columns={ProductsColumns}
        pages={totalPages === 1 ? undefined : totalPages}
      />
    </div>
  );
};

export default page;

const ProductsColumns: Column<PhoneNumber>[] = [
  {
    key: "_id",
    label: "ID",
    type: "action",
    RowAction({ item }) {
      return (
        <Link
          href={`/shop?q=${item.phoneNumber}`}
          className="cursor-pointer text-primary hover:underline"
        >
          <p>#{String(item._id).slice(-5)}</p>
        </Link>
      );
    },
  },
  {
    key: "active",
    label: "الحالة",
    type: "boolean",
    action: updateProductById,
  },
  { key: "name", label: "الاسم" },
  { key: "updatedAt", label: "اخر تحديث", type: "date" },
  { key: "phoneNumber", label: "رقم الهاتف" },
  { key: "company", label: "الشركة" },
  { key: "price", label: "السعر" },
  { key: "score", label: "الشعبية" },
  {
    label: "ACTION",
    type: "action",
    RowAction: ({ item }) => <ActionButtons id={item._id} />,
  },
];
