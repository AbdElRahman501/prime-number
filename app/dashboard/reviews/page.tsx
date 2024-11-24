import ActionButtons from "@/components/ActionButtons";
import Modal from "@/components/Modal";
import RemoveModal from "@/components/RemoveModal";
import ReviewForm from "@/components/ReviewForm";
import { ReviewCard } from "@/components/TestimonialCarousel";
import {
  deleteReviewById,
  fetchAllReviews,
} from "@/lib/actions/reviews.actions";
import { Review } from "@/types";
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
    <div className="flex-1 overflow-hidden">
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
            className="transform self-end text-nowrap rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            اضافة راي جديد
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
        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {reviews.map((review) => (
            <div key={review._id} className="relative h-full w-full">
              <ReviewCard
                className={`${review.active ? "" : "opacity-50"} flex h-full items-center justify-center rounded-[50px] bg-white p-10`}
                {...review}
              />
              <ActionButtons
                className="absolute bottom-5 right-5 flex gap-2"
                id={review._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
