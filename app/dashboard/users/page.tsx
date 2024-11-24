import Modal from "@/components/Modal";

import { deleteUser, getUsers } from "@/lib/actions/user.actions";
import { User } from "@/types";
import { getActionItems, modalKey } from "@/utils";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import UserForm from "@/components/UserForm";
import RemoveModal from "@/components/RemoveModal";
import Image from "next/image";
import ActionButtons from "@/components/ActionButtons";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(options);

  const users = await getUsers();
  const { editItem, isAddItem, removeItem } = getActionItems<
    User & { _id: string }
  >(users, searchParams);

  const isAdmin = session?.user.role === "admin";
  const allowEdit = session?.user.email !== editItem?.email && isAdmin;
  const allowDelete = session?.user.email !== removeItem?.email && isAdmin;
  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">المستخدمين</h1>
          {isAdmin ? (
            <Link
              href={{
                query: {
                  ...searchParams,
                  [modalKey("add")]: "true",
                },
              }}
              className="transform self-end text-nowrap rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              اضافة مستخدم جديد
            </Link>
          ) : null}
        </div>

        <Modal isOpen={!!isAddItem && isAdmin}>
          <UserForm />
        </Modal>
        <Modal isOpen={!!editItem && isAdmin && allowEdit}>
          <UserForm item={editItem} />
        </Modal>
        <RemoveModal
          item={allowDelete ? removeItem : undefined}
          action={deleteUser}
        >
          <div className="min-w-[70vw] md:min-w-[350px]">
            <p>هل انت متاكد من حذف هذا المستخدم ؟</p>
            <div
              key={removeItem?._id}
              className="flex items-center justify-start gap-4 rounded-3xl border border-gray-300 bg-white p-4 text-primary shadow-sm"
            >
              <div className="h-14 w-14">
                <Image
                  src={removeItem?.image || "/images/placeholder.jpg"}
                  alt="image"
                  width={56}
                  height={56}
                  className="aspect-square h-14 w-14 rounded-full border border-gray-300 object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold">{removeItem?.name}</p>
                <p className="text-sm">{removeItem?.email}</p>
              </div>
            </div>
          </div>
        </RemoveModal>
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <div
              key={user._id}
              className={`${user.email === session?.user.email ? "border border-primary" : ""} flex items-center justify-start gap-4 rounded-3xl bg-white p-4 text-primary shadow-sm`}
            >
              <div className="h-14 w-14">
                <Image
                  src={user.image || "/images/placeholder.jpg"}
                  alt="image"
                  width={56}
                  height={56}
                  className="aspect-square min-h-14 min-w-14 rounded-full border border-gray-300 object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold">{user.name}</p>
                <Link
                  href={`mailto:${user.email}`}
                  className="break-all text-sm hover:underline"
                >
                  {user.email}
                </Link>
              </div>
              {isAdmin && user.email !== session?.user.email ? (
                <ActionButtons id={user._id} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
