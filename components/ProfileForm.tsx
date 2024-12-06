"use client";
import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";
import { User } from "@/types";
import { changePassword, updateUser } from "@/lib/actions/user.actions";
import LoadingDots from "./loading-dots";
import { useSession } from "next-auth/react";

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

const ProfileForm: React.FC<{ user: User }> = ({ user }) => {
  const { update } = useSession();
  const [data, setData] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isDirty, setIsDirty] = useState(false);

  const [openImageModal, setOpenImageModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

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
      window.location.reload();
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  }

  const handleReset = () => {
    setData(user);
    setIsDirty(false);
  };

  return (
    <div>
      <ImageModal
        image={data.image || ""}
        isOpen={openImageModal}
        onClose={() => setOpenImageModal(false)}
        onSubmit={(image) => {
          const newData = { ...data, image };
          setIsDirty(JSON.stringify(newData) !== JSON.stringify(user));
          setData(newData);
        }}
      />
      <ChangePasswordModal
        id={user._id}
        isOpen={openChangePasswordModal}
        onClose={() => setOpenChangePasswordModal(false)}
      />
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
                onClick={handleReset}
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
            onClick={() => setOpenImageModal(true)}
            className="overflow-hidden rounded-full bg-white p-5 shadow-sm"
          >
            <Image
              src={data.image || "/images/placeholder.jpg"}
              alt="user"
              className="h-32 w-32 rounded-full object-cover"
              width={100}
              height={100}
            />
          </button>
        </div>
        <div className="mx-auto mt-4 flex max-w-lg flex-col gap-4">
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
              ادخل الاسم صحيح
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

          <div className="w-full rounded-3xl bg-white p-5 shadow-sm">
            <button
              type="button"
              onClick={() => setOpenChangePasswordModal(true)}
            >
              تغير الباسورد
            </button>
          </div>
          {error && <p className="text-center text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
};

const ImageModal: React.FC<{
  image: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (image: string) => void;
}> = ({ image, isOpen, onClose, onSubmit }) => {
  const [newImage, setNewImage] = useState(image);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newImage);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} scrollLock={isOpen}>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row">
        <form
          onSubmit={handleSubmit}
          className="flex w-[60vw] max-w-lg flex-col items-center gap-4"
        >
          <div className="mt-4 flex w-full justify-center">
            <Image
              src={
                isValidImageUrl(newImage) ? newImage : "/images/placeholder.jpg"
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
              disabled={!isValidImageUrl(newImage)}
              className="w-full rounded-2xl bg-primary py-4 text-white shadow-md duration-300 enabled:hover:scale-105 enabled:hover:bg-white enabled:hover:text-black enabled:hover:shadow-lg enabled:focus:outline-none enabled:focus:ring-2 enabled:focus:ring-primary enabled:focus:ring-offset-2 disabled:opacity-50"
            >
              حفظ
            </button>
            <button
              onClick={onClose}
              type="reset"
              className="w-full rounded-2xl border border-primary py-4 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
const ChangePasswordModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  id: string;
}> = ({ isOpen, onClose, id }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassWord] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const result = await changePassword(id, currentPassword, newPassword);
    if (result.success) {
      onClose();
      setCurrentPassword("");
      setNewPassWord("");
      setError("");
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  }

  return (
    <Modal isOpen={isOpen} scrollLock={isOpen}>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-5 md:flex-row">
        <form
          onSubmit={handleSubmit}
          className="flex w-[60vw] max-w-lg flex-col items-center gap-4 p-5"
        >
          <label htmlFor="email" className="w-full text-lg text-primary">
            رقم السري الحالي
          </label>
          <input
            dir="ltr"
            type="password"
            name="current-password"
            id="current-password"
            placeholder="ادخل رقم السري الحالي"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="peer h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 text-left tracking-wider outline-none invalid:border-pink-500 invalid:text-pink-600 placeholder-shown:invalid:border-black focus:border-2 focus:border-black focus:text-primary placeholder-shown:invalid:focus:border-black motion-reduce:transition-none md:text-lg"
          />
          <label htmlFor="email" className="w-full text-lg text-primary">
            رقم السري الجديد
          </label>
          <input
            dir="ltr"
            type="password"
            name="new-password"
            id="new-password"
            placeholder="ادخل رقم السري الجديد"
            value={newPassword}
            onChange={(e) => setNewPassWord(e.target.value)}
            required
            className="peer h-14 w-full rounded-3xl border border-gray-300 bg-transparent p-4 px-6 text-left tracking-wider outline-none invalid:border-pink-500 invalid:text-pink-600 placeholder-shown:invalid:border-black focus:border-2 focus:border-black focus:text-primary placeholder-shown:invalid:focus:border-black motion-reduce:transition-none md:text-lg"
          />
          <div className="flex w-full flex-row gap-2 rounded-3xl shadow-sm md:gap-5">
            <button
              type="submit"
              disabled={!newPassword || !currentPassword}
              className="w-full rounded-2xl bg-primary py-4 text-white shadow-md duration-300 enabled:hover:scale-105 enabled:hover:bg-white enabled:hover:text-black enabled:hover:shadow-lg enabled:focus:outline-none enabled:focus:ring-2 enabled:focus:ring-primary enabled:focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? <LoadingDots /> : "حفظ"}
            </button>
            <button
              onClick={() => {
                onClose();
                setCurrentPassword("");
                setNewPassWord("");
              }}
              type="reset"
              className="w-full rounded-2xl border border-primary py-4 text-primary shadow-md duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              إلغاء
            </button>
          </div>
          <p className="text-sm text-pink-600">{error}</p>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileForm;
