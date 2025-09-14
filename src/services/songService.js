 import { API_PREFIX } from "../components/contants";
import { get } from "../utils/request";

 export const getListSong = async (slugTopic) => {
  const result = await get(`${API_PREFIX}/songs/${slugTopic}`);
  return result;
 }