import { del, get } from "../../utils/request";
import { API_PREFIX } from "../../components/admin/Contants";

export const getListTopic = async () => {
  const result = await get(`${API_PREFIX}/topics`);
  return result;
}

export const deleteTopic = async () => {
  const result = await del(`${API_PREFIX}/topics`);
  return result;
}