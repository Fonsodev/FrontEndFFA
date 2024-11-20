import { SupplementsProduct } from "./supplements-product";

export interface ItemSupplement {
  info: SupplementsProduct | undefined,
  order: number,
  total: number
}
