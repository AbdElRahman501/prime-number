"use client";
import { Link, Store } from "@/types";
import { useState } from "react";
import { usePrompt } from "./Notification";
import { updateStore } from "@/lib/actions/store.actions";
import LoadingDots from "./loading-dots";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextBlock from "./TextBlock";

const StoreForm: React.FC<{ store: Store }> = ({ store }) => {
  return (
    <div className="container m-5 mx-auto flex flex-col gap-5 px-5">
      <ContactForm store={store} />
      <QuickLinksForm store={store} />
      <SocialMediaLinksForm store={store} />
      <FeaturesForm store={store} />
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
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    const newData = {
      ...data,
      [name]: type === "checkbox" ? checked : value,
    };
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.contacts));
    setData(newData);
  };
  const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    const newData = {
      ...data,
      workHours: { ...data.workHours, [name]: value },
    };
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.contacts));
    setData(newData);
  };

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
              className="rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {loading ? (
                <div className="h-6">
                  <LoadingDots />
                </div>
              ) : (
                "حفظ"
              )}
            </button>
            <button
              onClick={() => {
                setData(store.contacts);
                setIsDirty(false);
              }}
              type="reset"
              className="rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              إلغاء
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
          <label htmlFor="email" className="w-full text-lg text-primary">
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
            <label htmlFor="" className="text-lg text-primary">
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
            <label htmlFor="" className="text-lg text-primary">
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
            <div className="mt-2 flex w-full flex-wrap gap-2 md:flex-nowrap md:gap-5">
              <label
                htmlFor=""
                className="flex w-full items-center gap-2 md:block"
              >
                <span className="w-20 text-nowrap">البداية :</span>
                <input
                  type="time"
                  name="start"
                  id="start"
                  placeholder="ادخل مواعيد بدء العمل"
                  value={data.workHours.start}
                  onChange={handleWorkTimeChange}
                  className="h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
                />
              </label>
              <label
                htmlFor=""
                className="flex w-full items-center gap-2 md:block"
              >
                <span className="w-20 text-nowrap">الانتهاء :</span>
                <input
                  type="time"
                  name="end"
                  id="end"
                  placeholder="ادخل مواعيد انتهاء العمل"
                  value={data.workHours.end}
                  onChange={handleWorkTimeChange}
                  className="h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-red-500">{error}</p>
    </form>
  );
};

const QuickLinksForm: React.FC<{ store: Store }> = ({ store }) => {
  const [data, setData] = useState(store.links);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  usePrompt("Leave screen?", isDirty);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    const newData = data.map((link, i) =>
      i === index ? { ...link, [name]: value } : link,
    );
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.links));
    setData(newData);
  };

  const addItem = () => {
    const newData = [...data, { title: "", url: "" } as Link];
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.links));
    setData(newData);
  };

  const removeItem = () => {
    const newData = data.slice(0, -1);
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.links));
    setData(newData);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await updateStore({ links: data });
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
        <h2 className="text-xl text-primary md:text-3xl"> روابط سريعة</h2>
        {isDirty ? (
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {loading ? (
                <div className="h-6">
                  <LoadingDots />
                </div>
              ) : (
                "حفظ"
              )}
            </button>
            <button
              onClick={() => {
                setData(store.links);
                setIsDirty(false);
              }}
              type="reset"
              className="rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              إلغاء
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-2 w-full rounded-3xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-2 gap-2 border-b-2 pb-4 md:grid-cols-5 md:gap-5">
          <p className="md:col-span-2">العنوان </p>
          <div className="flex justify-between md:col-span-3">
            <p>الرابط</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addItem}
                className="h-8 w-8 rounded-full bg-primary text-white shadow-md duration-300 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Icon icon="mdi:add" className="m-auto h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={removeItem}
                className="h-8 w-8 rounded-full border border-primary text-primary shadow-md duration-300 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Icon icon="mdi:minus" className="m-auto h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-2 md:grid-cols-5 md:gap-5"
          >
            <input
              type="text"
              name="title"
              id="title"
              placeholder="ادخل العنوان"
              value={item.title}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index)
              }
              className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:col-span-2 md:text-lg"
            />
            <input
              dir="ltr"
              type="text"
              name="url"
              id="url"
              placeholder="ادخل العنوان"
              value={item.url}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index)
              }
              className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:col-span-3 md:text-lg"
            />
          </div>
        ))}

        <p className="text-sm text-red-500">{error}</p>
      </div>
    </form>
  );
};

const SocialMediaLinksForm: React.FC<{ store: Store }> = ({ store }) => {
  const [data, setData] = useState(store.socialMedia);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  usePrompt("Leave screen?", isDirty);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    const newData = data.map((link, i) =>
      i === index ? { ...link, [name]: value } : link,
    );
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.socialMedia));
    setData(newData);
  };

  const addItem = () => {
    const newData = [...data, { title: "", url: "", icon: "" } as Link];
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.socialMedia));
    setData(newData);
  };

  const removeItem = () => {
    const newData = data.slice(0, -1);
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.socialMedia));
    setData(newData);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await updateStore({ socialMedia: data });
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
        <h2 className="text-xl text-primary md:text-3xl">التواصل الاجتماعي</h2>
        {isDirty ? (
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {loading ? (
                <div className="h-6">
                  <LoadingDots />
                </div>
              ) : (
                "حفظ"
              )}
            </button>
            <button
              onClick={() => {
                setData(store.socialMedia);
                setIsDirty(false);
              }}
              type="reset"
              className="rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              إلغاء
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-2 w-full rounded-3xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-2 grid-rows-1 gap-2 border-b-2 pb-4 md:grid-cols-4 md:gap-5">
          <p>الايقونه </p>
          <p>العنوان </p>
          <div className="col-span-2 flex justify-between">
            <p>الرابط</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addItem}
                className="h-8 w-8 rounded-full bg-primary text-white shadow-md duration-300 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Icon icon="mdi:add" className="m-auto h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={removeItem}
                className="h-8 w-8 rounded-full border border-primary text-primary shadow-md duration-300 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Icon icon="mdi:minus" className="m-auto h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 grid-rows-1 gap-2 border-b-2 pb-4 md:grid-cols-4 md:gap-5"
          >
            <input
              type="text"
              dir="ltr"
              name="icon"
              id="icon"
              placeholder="الايقونة"
              value={item.icon}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index)
              }
              className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
            />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="ادخل العنوان"
              value={item.title}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index)
              }
              className="mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
            />
            <input
              dir="ltr"
              type="text"
              name="url"
              id="url"
              placeholder="ادخل الرابط"
              value={item.url}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index)
              }
              className="col-span-2 mt-4 h-14 w-full rounded-3xl border p-4 px-6 tracking-wider outline-none md:text-lg"
            />
          </div>
        ))}
        <p className="text-sm text-red-500">{error}</p>
      </div>
    </form>
  );
};

export const FeaturesForm: React.FC<{ store: Store }> = ({ store }) => {
  const [data, setData] = useState(store.features);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: string,
  ) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;
    const newData = data.map((feature) =>
      feature._id === id ? { ...feature, [name]: value } : feature,
    );
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(store.socialMedia));
    setData(newData);
  };

  const onReset = () => {
    setData(store.features);
    setIsDirty(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateStore({ features: data });
    if (result.success) {
      setIsDirty(false);
      setLoading(false);
    } else {
      setLoading(false);
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sticky top-[86px] flex w-full justify-between rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-xl text-primary md:text-3xl">ادارة المميزات</h2>
        {isDirty ? (
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {loading ? (
                <div className="h-6">
                  <LoadingDots />
                </div>
              ) : (
                "حفظ"
              )}
            </button>
            <button
              onClick={onReset}
              type="reset"
              className="rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              إلغاء
            </button>
          </div>
        ) : null}
      </div>
      <div className="px-5 py-20 md:px-20" aria-labelledby="features">
        <div className="mx-auto flex flex-col justify-center gap-8 sm:flex-row sm:flex-wrap">
          {data.map((feature) => (
            <div key={feature._id} className="max-w-sm md:w-[30%]">
              <TextBlock
                className="text-center text-2xl font-semibold text-primary"
                id={`${feature._id}-title`}
                name="title"
                placeholder="...قم بكتابة العنوان"
                required
                value={feature.title}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange(e, feature._id)
                }
              />
              <TextBlock
                className="mt-2 text-center text-primary"
                id={`${feature._id}-description`}
                name="description"
                placeholder="...قم بكتابة العنوان"
                required
                value={feature.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange(e, feature._id)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-red-500">{error}</p>
    </form>
  );
};
