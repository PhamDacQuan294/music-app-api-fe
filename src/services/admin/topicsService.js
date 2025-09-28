import { del, get } from "../../utils/request";
import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";

export const getListTopic = async (status, keyword) => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/topics`;

  const params = [];

  if (status) {
    params.push(`status=${status}`);
  }

  if (keyword) {
    params.push(`keyword=${keyword}`);
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