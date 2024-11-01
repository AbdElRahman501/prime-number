import ActionButtons from "@/components/ActionButtons";
import { CustomTable } from "@/components/CustomTable";
import { offers } from "@/constants";
import { Column, Offer } from "@/types";

const page = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-3xl font-bold">العروض</h1>
      <CustomTable
        searchParams={searchParams}
        data={offers}
        columns={columns}
        name="offer"
      />
    </div>
  );
};

export default page;

const columns: Column<Offer>[] = [
  { key: "title", label: "العنوان" },
  { key: "phoneNumber", label: "رقم الهاتف" },
  { key: "company", label: "الشركة" },
  {
    label: "التحكم",
    type: "action",
    RowAction: (item) => <ActionButtons name="offer" id={item._id} />,
  },
];
