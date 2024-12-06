"use client";
import { createUrl, modalKey } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types";
import { useState } from "react";
import { CustomInput } from "./CustomFormeElement";
import LoadingDots from "./loading-dots";
import { addUser, updateUser } from "@/lib/actions/user.actions";

const UserForm: React.FC<{
  item?: User;
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
        email: "",
        isAdmin: false,
        password: "",
        image: "",
      } as User),
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (item?._id) {
      const result = await updateUser(data);
      if (result.success) {
        close();
      } else {
        setError(result.message);
      }
    } else {
      const result = await addUser(data);
      if (result.success) {
        close();
      } else {
        setError(result.message);
      }
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[60vw] max-w-lg flex-col items-center gap-4"
    >
      <CustomInput
        dir="ltr"
        name="name"
        label="الاسم"
        value={data.name || ""}
        required
        type="text"
        error="الاسم مطلوب"
        onChange={handleChange}
      />
      <CustomInput
        dir="ltr"
        name="email"
        label="البريد الالكتروني"
        value={data.email || ""}
        required
        type="email"
        error="البريد الالكتروني مطلوب"
        onChange={handleChange}
      />
      {item ? null : (
        <CustomInput
          dir="ltr"
          name="password"
          label="كلمة المرور"
          value={data.password || ""}
          required
          type="password"
          error="كلمة المرور مطلوبة"
          onChange={handleChange}
        />
      )}

      <div className="flex w-full items-center justify-start gap-2">
        <div className="h-6 w-12">
          <button
            type="button"
            onClick={() => setData({ ...data, isAdmin: !data.isAdmin })}
            className={`${data.isAdmin ? "bg-green-500" : "bg-red-500"} h-6 w-12 rounded-full p-1 duration-300`}
          >
            <div
              className={`${data.isAdmin ? "translate-x-0" : "-translate-x-6"} h-4 w-4 rounded-full bg-white duration-300`}
            ></div>
          </button>
        </div>
        <p className="w-full text-sm">هذا المستخد هو مسؤول</p>
      </div>

      <p className="text-sm text-red-500">{error}</p>

      <div className="flex w-full flex-col justify-center md:flex-row md:gap-2">
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center rounded-3xl border-2 border-background bg-primary py-4 font-semibold text-background focus:outline-none focus:ring focus:ring-inset focus:ring-orange-400 md:max-w-[200px]"
        >
          {loading ? <LoadingDots /> : item?._id ? "تحديث" : "حفظ"}
        </button>
        <button
          type="button"
          onClick={close}
          className="mt-4 w-full rounded-3xl border-2 border-primary py-4 text-center font-semibold text-primary focus:outline-none focus:ring focus:ring-inset focus:ring-orange-400 md:max-w-[200px]"
        >
          الغاء
        </button>
      </div>
    </form>
  );
};

export default UserForm;
