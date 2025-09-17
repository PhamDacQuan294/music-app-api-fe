import { API_PREFIX } from "../../components/client/contants";
import { get, patch } from "../../utils/request";

export const getListSong = async (slugTopic) => {
  const result = await get(`${API_PREFIX}/songs/${slugTopic}`);
  return result;
}

export const getDetailSong = async (slugSong) => {
  const result = await get(`${API_PREFIX}/songs/detail/${slugSong}`);
  return result;
}

export const likeSong = async (options) => {
  const result = await patch(`${API_PREFIX}/songs/like/${options.typeLike}/${options.idSong}`, options);
  return result;
}

export const favoriteSong = async (options) => {
  const result = await patch(`${API_PREFIX}/songs/favorite/${options.typeFavorite}/${options.idSong}`, options);
  return result;
}

export const getListFavoriteSong = async () => {
  const result = await get(`${API_PREFIX}/favorite-songs`);
  return result;
}