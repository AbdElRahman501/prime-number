"use client";
import { wishListHandler } from "@/app/lib/wishList";
import { toggleWishListItem } from "@/utils";
import { useFormState } from "react-dom";

const WishListForm: React.FC<{
  children: React.ReactNode;
  phoneNumber: string;
}> = ({ children, phoneNumber }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, formAction] = useFormState(wishListHandler, null);
  const actionWithVariant = formAction.bind(null, phoneNumber);

  const addItemAction = () => {
    if (typeof window == "undefined") return;
    const wishListData = localStorage.getItem("wishList");
    const wishList: string[] = wishListData ? JSON.parse(wishListData) : [];
    localStorage.setItem(
      "wishList",
      JSON.stringify(toggleWishListItem(wishList, phoneNumber)),
    );
    actionWithVariant();
  };

  return <form action={addItemAction}>{children}</form>;
};

export default WishListForm;
