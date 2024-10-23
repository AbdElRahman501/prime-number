import { cookies } from "next/headers";
import CartModal from "./CartModal";
import { getMatchingItemsByKey } from "@/utils";
import { phoneNumbers } from "@/constants";
import { PhoneNumber } from "@/types";

const Cart: React.FC = () => {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];

  const cartItems: PhoneNumber[] = getMatchingItemsByKey(
    phoneNumbers as never[],
    cart,
    "phoneNumber",
  );
  return <CartModal cart={cartItems} />;
};

export default Cart;
