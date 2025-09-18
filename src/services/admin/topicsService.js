import { del, get } from "../../utils/request";
import { API_PREFIX, PREFIX_ADMIN } from "../../components/admin/Contants";

export const getListTopic = async () => {
  const result = await get(`${API_PREFIX}/${PREFIX_ADMIN}/topics`);
  return result;
}

export const deleteTopic = async () => {
  const result = await del(`${API_PREFIX}/${PREFIX_ADMIN}/topics`);
  return result;
}