import { ProductCartProps } from "@/types/product-cart.types";
import { create } from "zustand";

import * as cartInMemory from "./helpers/cart-in-memory";
import { ProductProps } from "@/utils/data/products";

type StateProps = {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
};

export const useCartStore = create<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) =>
    set((state) => ({
      products: cartInMemory.add(state.products, product),
    })),
}));
