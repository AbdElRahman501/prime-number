"use client";
import React from "react";
import { addCartItems } from "@/app/lib/cart";
import { addWishListItems } from "@/app/lib/wishList";

const LocalStorage = () => {
  const cart = typeof window !== "undefined" && localStorage.getItem("cart");
  const cartItems: string[] = cart ? JSON.parse(cart) : [];
  const favorite =
    typeof window !== "undefined" && localStorage.getItem("wishList");
  const favoriteItems: string[] = favorite ? JSON.parse(favorite) : [];

  const addCartItemsToCookies = addCartItems.bind(null, cartItems);
  const addFavoriteItemsToCookies = addWishListItems.bind(null, favoriteItems);
  React.useEffect(() => {
    addCartItemsToCookies(cartItems);
    addFavoriteItemsToCookies(favoriteItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LocalStorage;
