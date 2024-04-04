import axios from "axios";
import { baseUri } from "@/constants/BaseUrl";
import { ItemUpdateBody } from "../types/item";

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
