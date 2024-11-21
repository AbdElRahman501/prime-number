"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";
import { User } from "@/types";
import { updateUser } from "@/lib/actions/user.actions";
import LoadingDots from "./loading-dots";
import { usePrompt } from "./Notification";
import { useSession } from "next-auth/react";

const ProfileForm = ({ user }: { user: User }) => {
  const { data: session, update } = useSession();
  console.log("🚀 ~ ProfileForm ~ session:", session);
  const [data, setData] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isDirty, setIsDirty] = useState(false);

  const [editImage, setEditImage] = useState(false);
  const [newImage, setNewImage] = useState(user.image);

  usePrompt("Leave screen?", isDirty);

  function imageSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newData = { ...data, image: newImage };
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(user));
    setData(newData);
    setEditImage(false);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    const newData = { ...data, [name]: value };
    setIsDirty(JSON.stringify(newData) !== JSON.stringify(user));
    setData(newData);
  };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateUser(data);
    if (result.success) {
      update(data);
      setIsDirty(false);
      setEditImage(false);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  }

  const isValidImageUrl = (url?: string) => {
    if (!url) return false;
    const imageRegex = /\.(jpeg|jpg|gif|png|webp|svg|bmp|ico)$/i; // Match image file extensions
    try {
      const parsedUrl = new URL(url); // Validate URL format
      return imageRegex.test(parsedUrl.pathname); // Check file extension
    } catch (err: unknown) {
      console.error("Invalid URL:", err);
      return false; // Invalid URL
    }
  };

  return (
    <div>
      <Modal isOpen={editImage} scrollLock={editImage}>
        <div className="flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row">
          <form
            onSubmit={imageSubmit}
            className="flex w-[60vw] max-w-lg flex-col items-center gap-4"
          >
            <div className="mt-4 flex w-full justify-center">
              <Image
                src={
                  isValidImageUrl(newImage)
                    ? (newImage as string)
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg"
                }
                alt="user"
                className="h-32 w-32 rounded-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="w-full rounded-3xl bg-white md:p-5">
              <label htmlFor="email" className="w-full text-lg text-primary">
                الصوره
              </label>
              <input
                dir="ltr"
                type="text"
                name="image"
                id="image"
                placeholder="image"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                required
                className="peer mt-4 h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 text-left tracking-wider outline-none invalid:border-pink-500 invalid:text-pink-600 focus:border-2 focus:border-black focus:text-primary placeholder-shown:invalid:focus:border-black motion-reduce:transition-none md:text-lg"
              />
            </div>
            <div className="flex w-full flex-row gap-2 rounded-3xl shadow-sm md:gap-5 md:px-5">
              <button
                type="submit"
                className="w-full rounded-2xl bg-primary py-4 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                حفظ
              </button>
              <button
                onClick={() => setEditImage(false)}
                type="reset"
                className="w-full rounded-2xl border border-primary py-4 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                إلغاء
              </button>
            </div>
            {error && <p className="text-center text-red-500">{error}</p>}
          </form>
        </div>
      </Modal>
      <form onSubmit={submit}>
        <div className="flex w-full justify-between rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-xl text-primary md:text-3xl">الحساب</h2>
          {isDirty ? (
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isLoading ? (
                  <div className="h-6">
                    <LoadingDots />
                  </div>
                ) : (
                  "حفظ"
                )}
              </button>
              <button
                onClick={() => {
                  setData(user);
                  setNewImage(user.image);
                }}
                type="reset"
                className="rounded-2xl border border-primary px-4 py-2 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                إلغاء
              </button>
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex w-full justify-center">
          <button
            type="button"
            onClick={() => setEditImage(true)}
            className="overflow-hidden rounded-full bg-white p-5 shadow-sm"
          >
            <Image
              src={
                data.image ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/542px-Unknown_person.jpg"
              }
              alt="user"
              className="h-32 w-32 rounded-full object-cover"
              width={100}
              height={100}
            />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
            <label htmlFor="email" className="w-full text-lg text-primary">
              الاسم{" "}
            </label>
            <input
              dir="ltr"
              type="name"
              name="name"
              id="name"
              placeholder="ادخل الاسم"
              value={data.name}
              onChange={handleChange}
              required
              className="peer mt-4 h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 text-left tracking-wider outline-none invalid:border-pink-500 invalid:text-pink-600 focus:border-2 focus:border-black focus:text-primary placeholder-shown:invalid:focus:border-black motion-reduce:transition-none md:text-lg"
            />
            <p className="hidden px-2 text-sm text-pink-600 peer-invalid:block peer-focus:hidden">
              ادخل بريد الكتروني صحيح
            </p>
          </div>
          <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
            <label htmlFor="email" className="w-full text-lg text-primary">
              البريد الالكتروني{" "}
            </label>
            <input
              dir="ltr"
              type="email"
              name="email"
              id="email"
              readOnly
              placeholder="ادخل البريد الالكتروني"
              value={data.email}
              onChange={handleChange}
              required
              className="peer mt-4 h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 text-left tracking-wider outline-none md:text-lg"
            />
            <p className="hidden px-2 text-sm text-pink-600 peer-invalid:block peer-focus:hidden">
              ادخل بريد الكتروني صحيح
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
