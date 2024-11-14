import ActionButtons from "@/components/ActionButtons";
import { CustomTable } from "@/components/CustomTable";
import Modal from "@/components/Modal";
import RemoveModal from "@/components/RemoveModal";
import ReviewForm from "@/components/ReviewForm";
import { ReviewCard } from "@/components/TestimonialCarousel";
import {
  deleteReviewById,
  fetchAllReviews,
  updateReviewById,
} from "@/lib/actions/reviews.actions";
import { Column, Review } from "@/types";
import { getActionItems, modalKey } from "@/utils";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const reviews = await fetchAllReviews();
  const { editItem, isAddItem, removeItem } = getActionItems<Review>(
    reviews,
    searchParams,
  );
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">اراء العملاء </h1>
        <Link
          href={{
            query: {
              ...searchParams,
              [modalKey("add")]: "true",
            },
          }}
          className="self-end rounded-md bg-primary px-4 py-2 text-white"
        >
          اضافة جديد
        </Link>
      </div>

      <Modal isOpen={!!isAddItem} scrollLock={!!isAddItem || !!editItem}>
        <ReviewForm />
      </Modal>

      <Modal isOpen={!!editItem} scrollLock={!!isAddItem || !!editItem}>
        <ReviewForm item={editItem!} />
      </Modal>

      <RemoveModal item={removeItem} action={deleteReviewById}>
        <div className="min-w-[70vw] md:min-w-[350px]">
          <p>هل انت متاكد من حذف هذا ؟</p>
          <ReviewCard {...removeItem!} />
        </div>
      </RemoveModal>

      <CustomTable
        searchParams={searchParams}
        data={reviews}
        columns={columns}
      />
    </div>
  );
};

export default page;

const columns: Column<Review>[] = [
  { key: "name", label: "الاسم" },
  { key: "active", label: "الحالة", type: "boolean", action: updateReviewById },
  { key: "review", label: "راي العميل", type: "description" },
  {
    label: "التحكم",
    type: "action",
    RowAction: ({ item }) => <ActionButtons id={item._id} />,
  },
];
