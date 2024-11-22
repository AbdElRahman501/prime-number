"use client";
import { createUrl, modalKey } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Review } from "@/types";
import { useState } from "react";
import { CustomInput, CustomTextArea } from "./CustomFormeElement";
import LoadingDots from "./loading-dots";
import { ReviewCard } from "./TestimonialCarousel";
import { addReview, updateReviewById } from "@/lib/actions/reviews.actions";

const ReviewForm: React.FC<{
  item?: Review;
}> = ({ item }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const key = modalKey(item ? "edit" : "add");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(
    item ||
      ({
        name: "",
        review: "",
      } as Review),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const close = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          if (item?._id) {
            const result = await updateReviewById(data);
            if (result.success) {
              close();
            } else {
              setError(result.message);
            }
          } else {
            const result = await addReview(data);
            if (result.success) {
              close();
            } else {
              setError(result.message);
            }
          }
          setLoading(false);
        }}
        className="flex w-[60vw] max-w-lg flex-col items-center gap-4"
      >
        <CustomInput
          name="name"
          label="الاسم"
          value={data.name || ""}
          required
          maxLength={30}
          type="text"
          error="الاسم مطلوب"
          onChange={handleChange}
        />

        <CustomTextArea
          className="h-36"
          name="review"
          placeholder="راي العميل"
          value={data.review || ""}
          maxLength={150}
          error="الراي مطلوب"
          required
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, review: e.target.value })
          }
        />

        <p className="text-sm text-red-500">{error}</p>
        <div className="flex w-full flex-col justify-center md:flex-row md:gap-2">
          <button
            type="button"
            onClick={close}
            className="mt-4 w-full rounded-3xl border-2 border-primary py-4 text-center font-semibold text-primary focus:outline-none focus:ring focus:ring-inset focus:ring-orange-400 md:max-w-[200px]"
          >
            الغاء
          </button>
          <button
            type="submit"
            disabled={loading || error !== ""}
            className="mt-4 flex w-full items-center justify-center rounded-3xl border-2 border-background bg-primary py-4 font-semibold text-background focus:outline-none focus:ring focus:ring-inset focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50 md:max-w-[200px]"
          >
            {loading ? <LoadingDots /> : item?._id ? "تحديث" : "حفظ"}
          </button>
        </div>
      </form>
      <ReviewCard
        className="flex h-60 w-full max-w-full items-center justify-center rounded-[50px] bg-white"
        {...data!}
      />
    </div>
  );
};

export default ReviewForm;
