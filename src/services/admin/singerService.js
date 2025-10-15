import { get } from "../../utils/request";
import { API_PREFIX } from "../../components/admin/Contants";
import { PREFIX_ADMIN } from "../../components/admin/Contants";

export const getListSinger = async (status) => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/singers`;

  const params = [];

  if (status) {
    params.push(`status=${status}`);
  }

  
  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const result = await get(url);
  return result;
}