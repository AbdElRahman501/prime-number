import ActionButtons from "@/components/ActionButtons";
import { CustomTable } from "@/components/CustomTable";
import Modal from "@/components/Modal";

import { getUsers } from "@/lib/actions/user.actions";
import { Column, User } from "@/types";
import { getActionItems, modalKey } from "@/utils";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(options);

  const users = await getUsers();
  const { editItem, isAddItem } = getActionItems<User & { _id: string }>(
    users,
    searchParams,
  );

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">جميع الارقام المميزه</h1>
          <Link
            href={{
              query: {
                ...searchParams,
                [modalKey("add")]: "true",
              },
            }}
            className="transform self-end text-nowrap rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            اضافة رقم جديد
          </Link>
        </div>
        <Modal isOpen={!!isAddItem}>add user</Modal>
        <Modal isOpen={!!editItem}>edit user</Modal>

        <CustomTable
          data={users}
          columns={session?.user.role === "admin" ? AdminColumns : columns}
        />
      </div>
    </div>
  );
};

export default page;

const AdminColumns: Column<User>[] = [
  {
    key: "isAdmin",
    label: "ADMIN",
    type: "boolean",
  },
  { key: "name", label: "الاسم" },
  { key: "email", label: "البريد الالكتروني" },

  {
    label: "ACTION",
    type: "action",
    RowAction: ({ item }) => <ActionButtons id={item._id} />,
  },
];

const columns: Column<User>[] = [
  { key: "name", label: "الاسم" },
  { key: "email", label: "البريد الالكتروني" },
];
