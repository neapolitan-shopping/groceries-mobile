import { Item } from "./Item";

export type ShopList = {
  _id: string;
  name: string;
  items: Item[];
  shareId: string;
};
