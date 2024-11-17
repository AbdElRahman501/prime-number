"use client";
import { Column, Link, Store } from "@/types";
import { useEffect, useState } from "react";
import { CustomTable } from "./CustomTable";
import { usePrompt } from "./Notification";
import { updateStore } from "@/lib/actions/store.actions";

const StoreForm: React.FC<{ store: Store }> = ({ store }) => {
  return (
    <div className="container m-5 mx-auto flex flex-col gap-5 px-5">
      <ContactForm store={store} />
      <QuickLinksForm store={store} />
    </div>
  );
};

export default StoreForm;

const ContactForm: React.FC<{ store: Store }> = ({ store }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(store.contacts);
  const [isDirty, setIsDirty] = useState(false);

  usePrompt("Leave screen?", isDirty);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setData((prevData) => ({
      ...prevData,
      workHours: { ...prevData.workHours, [name]: value },
    }));
  };

  useEffect(() => {
    setIsDirty(JSON.stringify(data) !== JSON.stringify(store.contacts));
  }, [data, store.contacts]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await updateStore({ contacts: data });
        if (result.success) {
          setIsDirty(false);
          setLoading(false);
        } else {
          setLoading(false);
          setError(result.message);
        }
      }}
    >
      <div className="sticky top-[86px] flex w-full justify-between rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-xl text-primary md:text-3xl">معلومات التواصل </h2>
        {isDirty ? (
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="transform rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {loading ? "..." : "حفظ"}
            </button>
            <button
              onClick={() => setData(store.contacts)}
              type="reset"
              className="transform rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              إلغاء
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
          <label htmlFor="email" className="w-full text-2xl text-primary">
            البريد الالكتروني{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="ادخل البريد الالكتروني"
            value={data.email}
            required
            onChange={handleChange}
            className="peer mt-4 h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 text-left tracking-wider outline-none invalid:border-pink-500 invalid:text-pink-600 focus:border-2 focus:border-black focus:text-primary placeholder-shown:invalid:focus:border-black motion-reduce:transition-none md:text-lg"
          />
          <p className="hidden px-2 text-sm text-pink-600 peer-invalid:block peer-focus:hidden">
            {data.email ? "ادخل بريد الكتروني صحيح" : "يجب ادخال بريد الكتروني"}
          </p>
        </div>
        <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
          <div>
            <label htmlFor="" className="text-2xl text-primary">
              العنوان
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="ادخل العنوان"
              value={data.address}
              required
              onChange={handleChange}
              className="peer mt-4 h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 tracking-wider outline-none invalid:border-pink-500 invalid:text-pink-600 focus:border-2 focus:border-black focus:text-primary placeholder-shown:invalid:focus:border-black motion-reduce:transition-none md:text-lg"
            />
            <p className="hidden px-2 text-sm text-pink-600 peer-invalid:block peer-focus:hidden">
              يجب ادخال العنوان
            </p>
          </div>
        </div>
        <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
          <div>
            <label htmlFor="" className="text-2xl text-primary">
              رقم الهاتف{" "}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="ادخل رقم الهاتف"
              value={data.phoneNumber}
              required
              pattern="^\+201(0|1|2|5)[0-9]{8}$"
              onChange={handleChange}
              className="peer mt-4 h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 tracking-wider outline-none invalid:border-pink-500 invalid:text-pink-600 focus:border-2 focus:border-black focus:text-primary placeholder-shown:invalid:focus:border-black motion-reduce:transition-none md:text-lg"
            />
            <p className="hidden px-2 text-sm text-pink-600 peer-invalid:block peer-focus:hidden">
              يجب ادخال رقم الهاتف
            </p>
          </div>
        </div>
        <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
          <div>
            <label htmlFor="" className="text-2xl text-primary">
              مواعيد العمل{" "}
            </label>
            <div className="flex flex-wrap md:flex-nowrap md:gap-5">
              <input
                type="time"
                name="start"
                id="start"
                placeholder="ادخل مواعيد بدء العمل"
                value={data.workHours.start}
                onChange={handleWorkTimeChange}
                className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
              />
              <input
                type="time"
                name="end"
                id="end"
                placeholder="ادخل مواعيد انتهاء العمل"
                value={data.workHours.end}
                onChange={handleWorkTimeChange}
                className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-red-500">{error}</p>
    </form>
  );
};

const QuickLinksForm: React.FC<{ store: Store }> = ({ store }) => {
  return (
    <div>
      <h2 className="mb-2 w-full rounded-3xl bg-white p-5 text-3xl text-primary shadow-sm">
        روابط سريعة
      </h2>
      <CustomTable data={store.links} columns={columns} />
    </div>
  );
};

const columns: Column<Link>[] = [
  { key: "title", label: "العنوان" },
  { key: "url", label: "الرابط" },
];
