import { companies, store } from "@/constants";
import { PhoneNumber } from "@/types";
import { createWhatsAppLink, formatPrice } from "@/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";
import LogoIcons from "./icons/logos";
import dynamic from "next/dynamic";

const CartForm = dynamic(() => import("@/components/CartForm"), {
  loading: () => (
    <div className="h-10 w-10 animate-pulse rounded-full bg-white"></div>
  ),
  ssr: false,
});
const WishListForm = dynamic(() => import("@/components/WishListForm"), {
  loading: () => (
    <div className="h-10 w-10 animate-pulse rounded-full bg-white"></div>
  ),
  ssr: false,
});
const SubmitButton = dynamic(() => import("@/components/SubmitButton"), {
  ssr: false,
});

const ProductCard: React.FC<
  PhoneNumber & { cart?: string[]; wishList?: string[]; className?: string }
> = ({ name, phoneNumber, price, company, cart, wishList, className }) => {
  const inCart = cart && cart.find((c) => c === phoneNumber);
  const inWishList = wishList && wishList.find((c) => c === phoneNumber);
  const color = companies.find((c) => c.name === company)?.color || "gray";
  return (
    <div
      className={
        className ||
        "flex h-full w-full min-w-[265px] flex-col justify-between rounded-3xl bg-foreground pt-6 text-primary"
      }
    >
      <div className="bg-background py-3">
        <h3
          className="text-center text-4xl font-bold drop-shadow"
          style={{ color }}
        >
          {phoneNumber}
        </h3>
      </div>
      <div className="flex justify-between p-3 pb-0">
        <h4 className="max-w-[40%] overflow-hidden text-nowrap font-bold">
          {name}
        </h4>
        <h4 className="text-nowrap text-lg font-bold">
          {formatPrice(price, "EGP")}
        </h4>
      </div>
      <div className="flex items-center justify-between p-3">
        <LogoIcons name={company} className="h-6 w-6" viewBox="0 0 50 50" />
        <div className="flex gap-2">
          {/* TODO : make it like @/components/icons/tableCell to call server function inside 
           onClick={async () => {
            await removeAction(id, name);
            close();
          }} */}
          <CartForm phoneNumber={phoneNumber} type={inCart ? "remove" : "add"}>
            <SubmitButton
              aria-label={`إضافة ${phoneNumber} إلى السلة`}
              className="rounded-full bg-background p-2"
              loadingItem={
                <Icon
                  className="h-6 w-6"
                  icon={!inCart ? "solar:bag-bold" : "solar:bag-linear"}
                />
              }
            >
              <Icon
                className="h-6 w-6"
                icon={inCart ? "solar:bag-bold" : "solar:bag-linear"}
              />
            </SubmitButton>
          </CartForm>
          <WishListForm phoneNumber={phoneNumber}>
            <SubmitButton
              aria-label={`إضافة ${phoneNumber} إلى المفضلة`}
              className="rounded-full bg-background p-2"
              loadingItem={
                <Icon
                  className="h-6 w-6"
                  icon={!inWishList ? "mdi:bookmark" : "mdi:bookmark-outline"}
                />
              }
            >
              <Icon
                className="h-6 w-6"
                icon={inWishList ? "mdi:bookmark" : "mdi:bookmark-outline"}
              />
            </SubmitButton>
          </WishListForm>
          <Link
            target="_blank"
            href={createWhatsAppLink(store.contacts.phoneNumber, phoneNumber)}
            aria-label={`مشاركة ${phoneNumber} على واتساب`}
            className="h-10 w-10 rounded-full bg-background p-2 text-2xl"
          >
            <Icon icon="ri:whatsapp-line" className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
