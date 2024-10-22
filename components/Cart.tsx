import { cookies } from "next/headers";
import CartModal from "./CartModal";
import { CartItem } from "@/types";

const Cart: React.FC = () => {
  const cartData = cookies().get("cart")?.value;
  const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

  return <CartModal cart={cart} />;
};

export default Cart;
