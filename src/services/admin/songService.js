import { get, post } from "../../utils/request";
import { API_PREFIX } from "../../components/admin/Contants";
import { PREFIX_ADMIN } from "../../components/admin/Contants";

export const getListSong = async () => {
  const result = await get(`${API_PREFIX}/${PREFIX_ADMIN}/songs`);
  return result;
}

export const createSong = async () => {
  const result = await get(`${API_PREFIX}/${PREFIX_ADMIN}/songs/create`);
  return result;
}

export const createSongPost = async (options) => {
  const result = await post(`${API_PREFIX}/${PREFIX_ADMIN}/songs/create`, options);
  return result;
}

