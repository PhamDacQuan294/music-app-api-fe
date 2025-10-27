import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";
import { get } from "../../utils/request";

export const getListSongStatitics = async () => {
  let url = `${API_PREFIX}/${PREFIX_ADMIN}/statistics/songs`;
  const result = await get(url);
  return result;
};
