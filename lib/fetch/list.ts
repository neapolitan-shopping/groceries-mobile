import { baseUri } from "@/constants/BaseUrl";
import axios from "axios";


export const getLists = async () => {
  try {
    const { data } = await axios.get(`${baseUri}/lists`);
    return data;
  } catch (e: any) {
    throw new Error(e.response.data);
  }
};
export const createList = async (newList: any) => {
  try {
    const res = await axios.post(`${baseUri}/lists`, newList);

    return res.data;
  } catch (error: any) {
    throw Error(error.response.data);
  }
};
export const deleteList = async (id: string) => {
  try {
    const res = await axios.delete(`${baseUri}/lists/${id}`);

    return res.data;
  } catch (err: any) {
    throw Error(err.response.data);
  }
};
