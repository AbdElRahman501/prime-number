import { cookies } from "next/headers";
import CartModal from "./CartModal";
import { PhoneNumber } from "@/types";
import { fetchProductsByPhoneNumbers } from "@/lib/actions/product.actions";

const Cart: React.FC = async () => {
  const cartData = cookies().get("cart")?.value;
  const cart: string[] = cartData ? JSON.parse(cartData) : [];
  const phoneNumbers: PhoneNumber[] = await fetchProductsByPhoneNumbers(cart);

  // display removed phone number as unActive product
  return <CartModal cart={phoneNumbers} />;
};

export default Cart;
