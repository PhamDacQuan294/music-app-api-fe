import { del, get } from "../../utils/request";
import { API_PREFIX } from "../../components/admin/Contants";
import { PREFIX_ADMIN } from "../../components/admin/Contants";
import { post2 } from "../../utils/request2";
import { patch2 } from "../../utils/request2";

export const getListSong = async (status, sortKey, sortValue) => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/songs`;

  const params = [];

  if (status) {
    params.push(`status=${status}`);
  }

  if (sortKey && sortValue) {
    params.push(`sortKey=${sortKey}&sortValue=${sortValue}`);
  }

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const result = await get(url);
  return result;
};

export const createSong = async () => {
  const result = await get(`${API_PREFIX}/${PREFIX_ADMIN}/songs/create`);
  return result;
}

export const deleteSong = async (id) => {
  const result = await del(`${API_PREFIX}/${PREFIX_ADMIN}/songs/delete/${id}`);
  return result;
}

export const updateSong = async (id, formData) => {
  const result = await patch2(`${API_PREFIX}/${PREFIX_ADMIN}/songs/edit/${id}`, formData);
  return result;
} 

export const createSongPost = async (formData) => {
  const result = await post2(`${API_PREFIX}/${PREFIX_ADMIN}/songs/create`, formData);
  return result;
};
