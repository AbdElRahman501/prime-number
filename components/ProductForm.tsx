"use client";
import { createUrl, modalKey } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CompanyName, PhoneNumber } from "@/types";
import { useState } from "react";
import { CustomInput, CustomSelect } from "./CustomFormeElement";
import { addProduct, updateProductById } from "@/lib/actions/product.actions";
import ProductCard from "./ProductCard";
import { companies } from "@/constants";
import LoadingDots from "./loading-dots";

type Pattern = Record<CompanyName, string>;

const ProductForm: React.FC<{
  item?: PhoneNumber;
}> = ({ item }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const key = modalKey(item ? "edit" : "add");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<PhoneNumber>(
    item ||
      ({
        name: "",
        phoneNumber: "",
        price: 0,
        company: "vodafone",
        active: true,
      } as PhoneNumber),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    const { name, value } = target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const close = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  const pattern: Pattern = {
    vodafone: "^(010)[0-9]{8}$",
    etisalat: "^(011)[0-9]{8}$",
    orange: "^(012)[0-9]{8}$",
    we: "^(015)[0-9]{8}$",
  };

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          if (item?._id) {
            const result = await updateProductById(data);
            if (result.success) {
              close();
            } else {
              setError(result.message);
            }
          } else {
            const result = await addProduct(data);
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
          maxLength={20}
          type="text"
          error="الاسم مطلوب"
          onChange={handleChange}
        />
        <CustomInput
          label="الرقم"
          name="phoneNumber"
          value={data.phoneNumber || ""}
          required
          pattern={pattern[data.company || "vodafone"]}
          type="tel"
          maxLength={11}
          minLength={11}
          error={`هذا الرقم غير صالح للشركه ${data.company || "vodafone"}`}
          onChange={handleChange}
        />
        <CustomSelect
          label="الشركه"
          name="company"
          value={data.company || ""}
          required
          onChange={handleSelectChange}
          options={companies.map((company) => company.name)}
        />
        <CustomInput
          name="price"
          label="السعر"
          value={data.price || ""}
          pattern="^[0-9]*$"
          error="السعر مطلوب"
          type="number"
          onChange={handleChange}
        />
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
            {data.active
              ? "هذا المنتج مفعل (يظهر في المتجر)"
              : "هذا المنتج غير مفعل (لن يظهر في المتجر)"}
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
      <ProductCard {...(data as PhoneNumber)} />
    </div>
  );
};

export default ProductForm;
