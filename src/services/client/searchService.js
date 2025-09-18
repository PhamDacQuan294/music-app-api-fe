import { get } from "../../utils/request"
import { API_PREFIX } from "../../components/client/contants";

export const searchResult = async (type, keyword) => {
  const result = await get(`${API_PREFIX}/search/${type}?keyword=${keyword}`);
  return result;
}