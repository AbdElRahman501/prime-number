"use client";
import { createUrl, modalKey } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Offer } from "@/types";
import { useState } from "react";
import { CustomInput, CustomTextArea } from "./CustomFormeElement";
import LoadingDots from "./loading-dots";
import { addOffer, updateOfferById } from "@/lib/actions/offer.actions";
import { OfferCard } from "./OffersCarousel";

const OfferForm: React.FC<{
  item?: Offer;
}> = ({ item }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const key = modalKey(item ? "edit" : "add");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<Offer>(
    item ||
      ({
        company: "",
        description: "",
        phoneNumber: "",
        title: "",
        end: "",
        start: Date.now().toString(),
        active: true,
      } as Offer),
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
          try {
            if (item?._id) {
              await updateOfferById(data);
            } else {
              await addOffer(data);
            }
            close();
            setLoading(false);
          } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
              if (error.message.includes("duplicate ")) {
                setError("رقم الهاتف موجود مسبقا");
              }
            }
          }
        }}
        className="flex w-[60vw] max-w-lg flex-col items-center gap-4"
      >
        <CustomInput
          label="الرقم"
          name="phoneNumber"
          value={data.phoneNumber || ""}
          required
          type="tel"
          maxLength={11}
          minLength={11}
          error={`هذا الرقم غير صالح للشركه ${data.company || "vodafone"}`}
          onChange={handleChange}
        />
        <CustomInput
          name="title"
          label="العنوان"
          value={data.title || ""}
          required
          maxLength={30}
          type="text"
          error="العنوان مطلوب"
          onChange={handleChange}
        />

        <CustomTextArea
          name="description"
          placeholder="الوصف"
          value={data.description || ""}
          maxLength={150}
          error="الوصف مطلوب"
          required
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData({ ...data, description: e.target.value })
          }
        />
        <div className="flex w-full flex-col items-center justify-start gap-2 md:flex-row">
          <CustomInput
            name="start"
            label="البداية"
            value={data.start || ""}
            type="date"
            onChange={handleChange}
          />
          <CustomInput
            name="end"
            label="النهاية"
            value={data.end || ""}
            type="date"
            onChange={handleChange}
          />
        </div>

        <div className="flex w-full items-center justify-start gap-2">
          <div className="h-6 w-12">
            <button
              type="button"
              onClick={() => setData({ ...data, active: !data.active })}
              className={`${data.active ? "bg-green-500" : "bg-red-500"} h-6 w-12 rounded-full p-1 duration-300`}
            >
              <div
                className={`${data.active ? "translate-x-0" : "-translate-x-6"} h-4 w-4 rounded-full bg-white duration-300`}
              ></div>
            </button>
          </div>
          <p className="w-full text-sm">
            {data.active ? "هذا العرض مفعل" : "هذا العرض غير مفعل "}
          </p>
        </div>
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
            className="mt-4 flex w-full items-center justify-center rounded-3xl border-2 border-background bg-primary py-4 font-semibold text-background focus:outline-none focus:ring focus:ring-inset focus:ring-orange-400 md:max-w-[200px]"
          >
            {loading ? <LoadingDots /> : item?._id ? "تحديث" : "حفظ"}
          </button>
        </div>
      </form>
      <div className="scale-75 text-center">
        <OfferCard offer={data} viewOnly />
      </div>
    </div>
  );
};

export default OfferForm;