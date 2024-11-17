import ActionButtons from "@/components/ActionButtons";
import { CustomTable } from "@/components/CustomTable";
import Modal from "@/components/Modal";
import OfferForm from "@/components/OfferForm";
import { OfferCard } from "@/components/OffersCarousel";
import RemoveModal from "@/components/RemoveModal";
import {
  deleteOfferById,
  fetchAllOffers,
  updateOfferById,
} from "@/lib/actions/offer.actions";
import { Column, Offer } from "@/types";
import { getActionItems, modalKey } from "@/utils";
import Link from "next/link";

const page = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const offers = await fetchAllOffers();
  const { editItem, isAddItem, removeItem } = getActionItems<Offer>(
    offers,
    searchParams,
  );
  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">العروض</h1>
          <Link
            href={{
              query: {
                ...searchParams,
                [modalKey("add")]: "true",
              },
            }}
            className="transform self-end text-nowrap rounded-2xl bg-primary px-4 py-2 text-white shadow-md duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            اضافة عرض جديد
          </Link>
        </div>

        <Modal isOpen={!!isAddItem} scrollLock={!!isAddItem || !!editItem}>
          <OfferForm />
        </Modal>

        <Modal isOpen={!!editItem} scrollLock={!!isAddItem || !!editItem}>
          <OfferForm item={editItem!} />
        </Modal>

        <RemoveModal item={removeItem} action={deleteOfferById}>
          <div className="min-w-[70vw] md:min-w-[350px]">
            <p>هل انت متاكد من حذف هذا العرض ؟</p>
            <div className="scale-75 text-center">
              <OfferCard offer={removeItem!} viewOnly />
            </div>
          </div>
        </RemoveModal>

        <CustomTable
          searchParams={searchParams}
          data={offers}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default page;

const columns: Column<Offer>[] = [
  { key: "title", label: "العنوان" },
  { key: "phoneNumber", label: "رقم الهاتف" },
  {
    key: "active",
    label: "الحالة",
    type: "boolean",
    action: updateOfferById,
  },
  { key: "start", label: "البداية", type: "date" },
  { key: "end", label: "النهاية", type: "date" },
  {
    label: "التحكم",
    type: "action",
    RowAction: ({ item }) => <ActionButtons id={item._id} />,
  },
];
