import { cookies } from "next/headers";
import CartModal from "./CartModal";
import { PhoneNumber, Store } from "@/types";
import { fetchProductsByPhoneNumbers } from "@/lib/actions/product.actions";

const Cart: React.FC<{ store: Store }> = async ({ store }) => {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];
  const phoneNumbers: PhoneNumber[] = await fetchProductsByPhoneNumbers(cart);
  return <CartModal cart={phoneNumbers} store={store} />;
};

export default Cart;
