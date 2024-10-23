"use client";
import { cartHandler } from "@/app/lib/cart";
import { addToCart } from "@/utils";
import { useFormState } from "react-dom";

const CartForm: React.FC<{
  children: React.ReactNode;
  phoneNumber: string;
  type: "remove" | "add";
}> = ({ children, phoneNumber, type }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, formAction] = useFormState(cartHandler, null);
  const actionWithVariant = formAction.bind(null, { phoneNumber, type });

  const addItemAction = () => {
    if (typeof window == "undefined") return;
    const cartData = localStorage.getItem("cartItems");
    const cart: string[] = cartData ? JSON.parse(cartData) : [];
    localStorage.setItem(
      "cartItems",
      JSON.stringify(addToCart(cart, phoneNumber)),
    );
    actionWithVariant();
  };

  return <form action={addItemAction}>{children}</form>;
};

export default CartForm;
