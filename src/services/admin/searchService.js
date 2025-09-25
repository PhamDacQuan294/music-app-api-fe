import { get } from "../../utils/request"
import { API_PREFIX } from "../../components/client/contants";
import { PREFIX_ADMIN } from "../../components/admin/Contants";

export const searchService = async (type, keyword) => {
  const result = await get(`${API_PREFIX}/${PREFIX_ADMIN}/${type}?keyword=${keyword}`);
  return result;
}