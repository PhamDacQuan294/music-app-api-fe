import { get } from "../../utils/request";
import { API_PREFIX } from "../../components/admin/Contants";
import { PREFIX_ADMIN } from "../../components/admin/Contants";

export const getListSinger = async () => {
  const result = await get(`${API_PREFIX}/${PREFIX_ADMIN}/singers`);
  return result;
}