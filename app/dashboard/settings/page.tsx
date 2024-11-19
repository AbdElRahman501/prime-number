import StoreForm from "@/components/StoreForm";
import { fetchStoreData } from "@/lib/actions/store.actions";
const page = async () => {
  const store = await fetchStoreData();
  return (
    <div className="flex-1">
      <StoreForm store={store} />
    </div>
  );
};

export default page;
