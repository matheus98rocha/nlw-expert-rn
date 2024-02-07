import { ProductProps } from "@/utils/data/products";

export type ProductCartProps = ProductProps & {
  quantity: number;
};
