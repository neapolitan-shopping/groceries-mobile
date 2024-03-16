import { baseUri } from "@/constants/BaseUrl";
import axios from "axios";

export const createList = async (newList: any) => {
  try {
    const res = await axios.post(`${baseUri}/lists`, newList);

    return res.data;
  } catch (error: any) {
    throw Error(error.response.data);
  }
};
