import { companies, store } from "@/constants";
import { PhoneNumber } from "@/types";
import { formatPrice } from "@/utils";
import LogoIcons from "./icons/logos";
import dynamic from "next/dynamic";
import WhatsAppButton from "./WhatsAppButton";

const CartButton = dynamic(() => import("@/components/CartButton"), {
  loading: () => (
    <div className="h-10 w-10 animate-pulse rounded-full bg-white"></div>
  ),
  ssr: false,
});
const WishListButton = dynamic(() => import("@/components/WishListButton"), {
  loading: () => (
    <div className="h-10 w-10 animate-pulse rounded-full bg-white"></div>
  ),
  ssr: false,
});

const ProductCard: React.FC<
  PhoneNumber & {
    cart?: string[];
    wishList?: string[];
  }
> = ({ name, phoneNumber, price, company, cart, wishList }) => {
  const color = companies.find((c) => c.name === company)?.color || "gray";
  return (
    <div
      className={
        "relative flex h-full w-full min-w-[265px] flex-col justify-between rounded-3xl bg-foreground pt-6 text-primary"
      }
    >
      <div className="bg-background py-3">
        <h3
          className="text-center text-4xl font-bold text-background"
          style={{ color: phoneNumber ? color : "" }}
        >
          {phoneNumber || " - "}
        </h3>
      </div>
      <div className="flex justify-between p-3 pb-0">
        <h4
          className={`${name ? "" : "text-foreground"} max-w-[40%] overflow-hidden text-nowrap font-bold`}
        >
          {name || " - "}
        </h4>

        <h4 className="text-nowrap text-lg font-bold">
          {formatPrice(price, "EGP")}
        </h4>
      </div>
      <div className="flex items-center justify-between p-3">
        <LogoIcons name={company} className="h-6 w-6" viewBox="0 0 50 50" />
        <div className="flex gap-2">
          {cart ? <CartButton phoneNumber={phoneNumber} cart={cart} /> : null}
          {wishList ? (
            <WishListButton phoneNumber={phoneNumber} wishList={wishList} />
          ) : null}
          <WhatsAppButton phoneNumber={phoneNumber} store={store} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
