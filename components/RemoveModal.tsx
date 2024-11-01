"use client";
import { removeAction } from "@/lib/actions";
import { createUrl } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// TODO : make its model in another component with more functions

const RemoveModal: React.FC<{
  name?: "product" | "offer";
}> = ({ name }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const key = `remove${name || ""}Id`;
  const id = searchParams.get(key);

  if (!id) return null;

  const close = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key);
    const optionUrl = createUrl(pathname, newSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <div className="fixed inset-0 top-[76px] z-30 flex h-[calc(100dvh-50px)] w-screen items-center justify-center bg-black/30 backdrop-blur-sm duration-300">
      <div className="flex flex-col items-center justify-between gap-2 rounded-3xl bg-white p-5">
        <p className="text-lg font-bold">هل انت متاكد من حذف هذا المنتج</p>
        {/* <input type="text" name="NAME" value={name} readOnly hidden />
        <input type="text" name="id" value={id} readOnly hidden /> */}
        <button
          onClick={close}
          className="mt-4 w-full rounded-3xl border-2 border-primary py-4 text-center font-semibold text-primary focus:outline-none focus:ring focus:ring-inset focus:ring-orange-400"
        >
          الغاء
        </button>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center rounded-3xl border-2 border-background bg-red-500 py-4 font-semibold text-background focus:outline-none focus:ring focus:ring-inset focus:ring-red-300"
          onClick={async () => {
            await removeAction(id, name);
            close();
          }}
        >
          احذف
        </button>
      </div>
    </div>
  );
};

export default RemoveModal;
