import { get } from "../../utils/request"
import { API_PREFIX } from "../../components/client/contants";

export const searchResult = async (keyword) => {
  const result = await get(`${API_PREFIX}/search/result?keyword=${keyword}`);
  return result;
}