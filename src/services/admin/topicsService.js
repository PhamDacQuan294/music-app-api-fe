import { del, get } from "../../utils/request";
import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { post2 } from "../../utils/request2";

export const getListTopic = async (status, keyword, sortKey, sortValue) => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/topics`;

  const params = [];

  if (status) {
    params.push(`status=${status}`);
  }

  if (keyword) {
    params.push(`keyword=${keyword}`);
  }

  if (sortKey && sortValue) {
    params.push(`sortKey=${sortKey}&sortValue=${sortValue}`);
  }

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const result = await get(url);
  return result;
}

export const deleteTopic = async () => {
  const result = await del(`${API_PREFIX}/${PREFIX_ADMIN}/topics`);
  return result;
}

export const createTopicPost = async (formData) => {
  const result = await post2(`${API_PREFIX}/${PREFIX_ADMIN}/topics/create`, formData);
  return result;
}