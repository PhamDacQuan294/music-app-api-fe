import { API_PREFIX } from "../components/client/contants";
import { get } from "../utils/request";

export const getListSong = async (slugTopic) => {
  const result = await get(`${API_PREFIX}/songs/${slugTopic}`);
  return result;
}

export const getDetailSong = async (slugSong) => {
  const result = await get(`${API_PREFIX}/songs/detail/${slugSong}`);
  return result;
}