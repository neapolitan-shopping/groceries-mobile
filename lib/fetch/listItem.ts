import axios from "axios";
import { baseUri } from "@/constants/BaseUrl";
import { Item, ItemUpdateBody, UpdateItemAction } from "../types/Item";
import { queryListClient } from "@/app/_layout";
import { ShopList } from "../types/ShopList";

export const getListItems = async (id: string) => {
  try {
    const { data } = await axios.get(`${baseUri}/lists/${id}`);
    return data;
  } catch (e: any) {
    throw new Error(e.response.data);
  }
};

export const updateListItem = async ({
  id,
  body,
}: {
  id: string;
  body: ItemUpdateBody;
}) => {
  try {
    const { data } = await axios.put(`${baseUri}/lists/${id}/item`, body);
    return data;
  } catch (e: any) {
    throw new Error(e.response.data);
  }
};

export const updateLocalListItem = async ({
  id,
  body,
}: {
  id: string;
  body: ItemUpdateBody;
}) => {
  queryListClient.setQueryData<ShopList>(["listItems"], (singleList) => {
    if (singleList && singleList._id === id) {
      switch (body.updateAction) {
        case UpdateItemAction.edit: {
          const itemsWithEdit: Item[] = singleList.items.map((item: any) => {
            if (item._id === body.itemId) {
              return {
                ...item,
                ...body.payload,
              };
            }
            return item;
          });

          return {
            ...singleList,
            items: itemsWithEdit,
          };
        }
        case UpdateItemAction.add: {
          singleList.items.push(body.payload as any);

          return singleList;
        }
        case UpdateItemAction.delete: {
          const itemsWithDelete = singleList.items.filter(
            (item) => item._id !== body.itemId
          );

          return {
            ...singleList,
            items: itemsWithDelete,
          };
        }
      }
    }
  });
};
