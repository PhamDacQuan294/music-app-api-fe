import { del, get, patch, post } from "../utils/request";
import { API_PREFIX } from "../components/contants";

export const getListTopic = async () => {
  const result = await get(`${API_PREFIX}/topics`);
  return result;
}